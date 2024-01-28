import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit"
import { db } from "server-service/db.js";
import type { iMatchInput, iRTList, iPlayerData, iUpdateManyPlayerData, iUpsertUmaStandingInput } from "interface/match.js";

export async function POST({locals, params, request}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  const payload: iMatchInput = await request.json()
  const today = new Date()
  const filterDate = new Date()
  const rtData: iRTList = {}
  const playerData: iPlayerData = {}
  const matchParticipantInput: Prisma.MatchParticipantCreateManyMatchDataInput[] = []
  const transRPInput: Prisma.TransactionRPCreateManyMatchDataInput[] = []
  const updatePlayerDataInput: iUpdateManyPlayerData = {}
  const upsertUmaStandingInput: iUpsertUmaStandingInput = {}
  
  try {
    //check payload to ensure only 4 player
    if (payload.participantIdList.length != 4 || payload.participantList.length != 4) throw 'Must input 4 player game'

    //create match unique code
    payload.participantIdList.sort((a,b) => {return a-b})
    const playerUniqueCode = payload.participantIdList[0].toString() + '|' + payload.participantIdList[1].toString() + '|' + payload.participantIdList[2].toString() + '|' + payload.participantIdList[3].toString()

    //get submitter member data, match type, all rankTitle data, all participant data, count match unique code in a single transaction   
    const [submitterData, matchType, rtList, playerList] = await db.$transaction([
      db.clubMember.findFirstOrThrow({
        where: {
          userId: locals.user?.id,
          clubData: {
            slug: slug
          },
        },
        include: {
          clubData: {
            include: {
              clubSetting: true
            }
          }
        }
      }),
      db.matchType.findFirstOrThrow({
        where: {
          id: payload.matchRuleId
        }
      }),
      db.rankTittle.findMany({
        select:{
          id: true,
          groupRefId: true,
          skillIndex: true,
          first: true,
          second: true,
          third: true,
          fourth: true,
          promotionRP: true,
          demotion: true,
          baseRP: true,
        }
      }),
      db.clubMember.findMany({
        where: {
          id: {
            in: payload.participantIdList
          }
        },
        select: {
          id: true,
          roleId: true,
          userData: {
            select: {
              id: true,
              seqId: true,
              currentRP: true,
              rtId: true,
              rankedAt: true,
            }
          }
        }
      })
      
    ])

    //count submited match unique code on the last 7 days
    filterDate.setDate(today.getDate() - 7)
    let totalSameMatch = await db.match.count({
      where: {
        AND: [
          {playerUniqueCode: playerUniqueCode},
          {matchAt: {gte: filterDate}} 
        ]
      }
    })
    if (totalSameMatch < 5) totalSameMatch = 0 // threshold 5 same match no effect
    else if (totalSameMatch > 50) totalSameMatch = 50 //set maximum same match

    //check submitter data
    if (submitterData.roleId > 302 || (submitterData.roleId == 302 && !submitterData.canSubmitMatch)) {
      throw 'You have no permission to submit a match for this club'
    }
    if (!submitterData.clubData.clubSetting) throw 'CLub Setting not set, please set uma, chombo, and yakuman point'

    //remap ranktitle and player data to hashmap instead of an array for easier reading
    rtList.forEach(element => {rtData[element.id] = element})
    playerList.forEach(element => {playerData[element.id] = element})
    
    //Check AVGSkill
    let useCC = matchType.ccBase
    let totalSkill = 0
    payload.participantList.forEach(participant => {
      if (participant.playerRtGroup == 201) useCC += matchType.ccNovice
      else if (participant.playerRtGroup == 202) useCC += matchType.ccAmateur
      else if (participant.playerRtGroup == 203) useCC += matchType.ccPro
      totalSkill += rtData[playerData[participant.clubMemberId].userData.rtId].skillIndex
    })
    const avgSkill = ((totalSkill * 100)/4)/100

    //determine rank multiplier to use
    const rankMultiplier = today.getTime() <= matchType.modEndDate.getTime() && today.getTime() >= matchType.modStartDate.getTime() ? matchType.modRankMultiplier : matchType.defaultRankMultiplier

    //determine baseUma based on submitter club
    const baseUma = [submitterData.clubData.clubSetting.firstUma, submitterData.clubData.clubSetting.secondUma, submitterData.clubData.clubSetting.thirdUma, submitterData.clubData.clubSetting.fourthUma]
    
    //loop for each participant, adjust position and build input for transaction write
    for (const [i, participant] of payload.participantList.entries()) {
      //determine baseRP
      const baseRP = [rtData[participant.playerRtId].first, rtData[participant.playerRtId].second, rtData[participant.playerRtId].third, rtData[participant.playerRtId].fourth]
      //determine position and draw
      let position = 3, draw = 0, bonusFromScore = 0, gainUma = 0, gainRP = 0, totalGainRP = 0, totalGainUma = 0
      for (let x = 0; x < 4; x++) {
        if (i != x) {
          if (participant.score > payload.participantList[x].score) {
            position--
          } else if (participant.score == payload.participantList[x].score) {
            position--
            draw++
          }
        }
      }

      //determine modifier
      const skillCoef = avgSkill - rtData[participant.playerRtId].skillIndex
      if (skillCoef < -1) {
        bonusFromScore = (((participant.score - (matchType.totalScore/4)) * skillCoef)/100)
      } else {
        bonusFromScore = ((participant.score - (matchType.totalScore/4))/100)
      }
      const bonusRP = participant.score > matchType.totalScore/2 ? baseRP[1] : participant.score < - (matchType.totalScore/2) ? baseRP[3] : 0

      //determine gained uma and gainedRP
      switch(draw) {
        case 0: 
          gainUma = baseUma[position] + ((participant.score - (matchType.totalScore/4))/100)
          gainRP =  baseRP[position]
          break
        case 1: 
          gainUma = ((baseUma[position] + baseUma[position + 1])/2) + ((participant.score - (matchType.totalScore/4))/100)
          gainRP =  ((baseRP[position] + baseRP[position + 1])/2)
          break
        case 2: 
          gainUma = ((baseUma[position] + baseUma[position + 1] + baseUma[position + 2])/3) + ((participant.score - (matchType.totalScore/4))/100)
          gainRP = ((baseRP[position] + baseRP[position + 1] + baseRP[position + 2])/3)
          break
        case 3: 
        default:
      }
      totalGainRP = Math.round((((rankMultiplier-totalSameMatch)* gainRP)/100) + bonusRP + bonusFromScore)
      totalGainUma = gainUma + (participant.yakuman * submitterData.clubData.clubSetting.yakumanBonus) + (participant.chombo * submitterData.clubData.clubSetting.chomboPenalty) 
      let adjustedRP = playerData[participant.clubMemberId].userData.currentRP + totalGainRP
      if (adjustedRP < 0) adjustedRP = 0
      let newRtId = playerData[participant.clubMemberId].userData.rtId
      let rankedAt = playerData[participant.clubMemberId].userData.rankedAt

      // build transaction RP input
      if (adjustedRP >= rtData[playerData[participant.clubMemberId].userData.rtId].promotionRP && rtData[playerData[participant.clubMemberId].userData.rtId].promotionRP > 0) {
        //promotion trigger
        adjustedRP = rtData[playerData[participant.clubMemberId].userData.rtId].baseRP
        newRtId = playerData[participant.clubMemberId].userData.rtId + 1
        rankedAt = today
        
        transRPInput.push({
          userId: playerData[participant.clubMemberId].userData.id,
          rpBefore: playerData[participant.clubMemberId].userData.currentRP,
          rpAfter: adjustedRP,
          rpMove: totalGainRP,
          rtChange: true,
          rtIdBefore: playerData[participant.clubMemberId].userData.rtId,
          rtIdAfter: playerData[participant.clubMemberId].userData.rtId + 1,
        })

      } else if (adjustedRP == 0 && rtData[playerData[participant.clubMemberId].userData.rtId].demotion) {
        //demotion trigger
        newRtId = playerData[participant.clubMemberId].userData.rtId - 1
        rankedAt = today

        transRPInput.push({
          userId: playerData[participant.clubMemberId].userData.id,
          rpBefore: playerData[participant.clubMemberId].userData.currentRP,
          rpAfter: adjustedRP,
          rpMove: totalGainRP,
          rtChange: true,
          rtIdBefore: playerData[participant.clubMemberId].userData.rtId,
          rtIdAfter: playerData[participant.clubMemberId].userData.rtId - 1,
        })

      } else {
        transRPInput.push({
          userId: playerData[participant.clubMemberId].userData.id,
          rpBefore: playerData[participant.clubMemberId].userData.currentRP,
          rpAfter: adjustedRP,
          rpMove: totalGainRP,
          rtChange: false,
        })
      }

      // build match participant input
      matchParticipantInput.push({
        avgMatchSkill: avgSkill,
        draw: draw > 0 ? true : false,
        gainUma: totalGainUma,
        playerRtId: playerData[participant.clubMemberId].userData.rtId,
        position: position,
        score: participant.score,
        seatRefId: i == 0 ? 701 : i == 1 ? 702 : i == 2 ? 703 : 704,
        userId: playerData[participant.clubMemberId].userData.id,
        chombo: participant.chombo,
        dealIn: participant.dealIn,
        ron: participant.ron,
        tsumo: participant.tsumo
      })

      // set update userData input
      updatePlayerDataInput[participant.clubMemberId] = {
        where: {
          id: playerData[participant.clubMemberId].userData.id
        },
        data: {
          currentRP: adjustedRP,
          rtData: {
            connect: {
              id: newRtId
            }
          },
          rankedAt: rankedAt,
          metaData: {
            update: {
              totalDealIn: {
                increment: participant.dealIn ?? 0,
              },
              totalRon: {
                increment: participant.ron ?? 0,
              },
              totalTsumo: {
                increment: participant.tsumo ?? 0,
              },
              totalChombo: {
                increment: participant.chombo ?? 0
              },
              totalFirst: {
                increment: position == 0 ? 1 : 0
              },
              totalFourth: {
                increment: position == 3 ? 1 : 0
              },
              totalSecond: {
                increment: position == 1 ? 1 : 0
              },
              totalThird: {
                increment: position == 2 ? 1 : 0
              },
              totalMatch: {
                increment: 1
              },

            }
          }
        }
      }

      //upsert uma standing
      upsertUmaStandingInput[participant.clubMemberId] = {
        where: {
          userId_clubId_periodMonth_periodYear: {
            userId: playerData[participant.clubMemberId].userData.id,
            clubId: submitterData.clubId,
            periodMonth: today.getMonth(),
            periodYear: today.getFullYear()
          }
        },
        create: {
          userId: playerData[participant.clubMemberId].userData.id,
          clubId: submitterData.clubId,
          totalUma: totalGainUma,
          totalMatch: 1,
          periodMonth: today.getMonth(),
          periodYear: today.getFullYear()
        },
        update: {
          totalUma: {
            increment: totalGainUma
          },
          totalMatch: {
            increment: 1
          }
        }
      }

    }      

    //submit write in transactions
    db.$transaction(async (tx) => {
      //deduct CC from club
      const updatedClub = await tx.club.update({
        where: {
          id: submitterData.clubId
        }, 
        data: {
          currentCC: {
            decrement: useCC
          }
        }
      })

      if (updatedClub.currentCC < 0) throw 'club credit not enough to submit match'

      //submit transaction history to clubs
      await tx.transactionCC.create({
        data: {
          clubData: {
            connect: {
              id: submitterData.clubId
            }
          },
          userData: {
            connect: {
              id: submitterData.userId
            }
          },
          ccBefore: submitterData.clubData.currentCC,
          ccMove: useCC,
          ccAfter: submitterData.clubData.currentCC - useCC,
          type: 651,           
        }
      })

      //Record match data
      await tx.match.create({
        data: {
          matchAt: payload.matchAt,
          typeId: payload.matchRuleId,
          deposit: payload.deposit,
          clubId: submitterData.clubId,
          creatorMemberId: submitterData.id,
          costCC: useCC,
          playerUniqueCode: playerUniqueCode,
          note: payload.note,
          participantList: {
            createMany: {
              data: matchParticipantInput
            }
          },
          transactionRPList: {
            createMany: {
              data: transRPInput
            }
          }
        }
      })

      //update user and upsert uma standing
      for (const [i, clubMemberId] of payload.participantIdList.entries()) {
        await db.user.update(updatePlayerDataInput[clubMemberId])
        await db.clubUmaStanding.upsert(upsertUmaStandingInput[clubMemberId])
      }
      
    })  
    
    response.header.ok = true

  } catch (e) {
    response.header.ok = false
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      response.header.error = e.message    
    } else {
      response.header.error = e as string
    }
  }

  return json(response)
}