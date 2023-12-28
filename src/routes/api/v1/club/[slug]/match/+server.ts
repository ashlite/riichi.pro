import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";
import type { iMatchInput } from "interface/match.js";

export async function POST({cookies, locals, params, request}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  const payload: iMatchInput = await request.json()
  const listParticipantId: number[] = []
  const today = new Date()

  try {
    if (!locals.user) {
      throw 'You must login to continue'
    }
    //check cookie
    await firebaseValidation(cookies)

    //get submitter member data, match type, 
    const [submitterData, matchType] = await db.$transaction([
      db.clubMember.findFirstOrThrow({
        where: {
          userId: locals.user.id,
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
      })
    ])

    if (submitterData.roleId > 302 || (submitterData.roleId == 302 && !submitterData.canSubmitMatch)) {
      throw 'You have no permission to submit a match to this club'
    } 

    //Check AVGSkill
    let useCC = matchType.ccBase
    let totalSkill = 0
    payload.participantList.forEach(participant => {
      listParticipantId.push(participant.userId)
      if (participant.playerRtGroup == 201) useCC += matchType.ccNovice
      else if (participant.playerRtGroup == 202) useCC += matchType.ccAmateur
      else if (participant.playerRtGroup == 203) useCC += matchType.ccPro
      totalSkill += participant.playerSkillIndex
    })
    const avgSkill = ((totalSkill * 100)/4)/100

    //determine rank multiplier to use
    const rankMultiplier = today.getTime() <= matchType.modEndDate.getTime() && today.getTime() >= matchType.modStartDate.getTime() ? matchType.modRankMultiplier : matchType.defaultRankMultiplier

    //create match unique code
    listParticipantId.sort((a,b) => {return a-b})
    const playerUniqueCode = listParticipantId[0].toString() + '|' + listParticipantId[1].toString() + '|' + listParticipantId[2].toString() + '|' + listParticipantId[3].toString()

    //count submited match unique code on the last 7 days
    today.setDate(today.getDate() - 7)
    let totalSameMatch = await db.match.count({
      where: {
        AND: [
          {playerUniqueCode: playerUniqueCode},
          {matchAt: {gte: today}} 
        ]
      }
    })
    if (totalSameMatch < 5) totalSameMatch = 0 // threshold 5 same match no effect
    else if (totalSameMatch > 50) totalSameMatch = 50 //set maximum same match

    db.$transaction(async (tx) => {
      //deduct CC from club
      const updatedClub = await db.club.update({
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
      await db.transactionCC.create({
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
      const resultMatch = await db.match.create({
        data: {
          matchAt: payload.matchAt,
          typeId: payload.matchRuleId,
          deposit: payload.deposit,
          clubId: submitterData.clubId,
          creatorMemberId: submitterData.id,
          costCC: useCC,
          playerUniqueCode: playerUniqueCode,
          note: payload.note,
        }
      })

      const participantInput: Prisma.MatchParticipantCreateManyInput[] = []
      const transRPInput: Prisma.TransactionRPCreateManyInput[] = []
      const baseUma = [submitterData.clubData.clubSetting!.firstUma, submitterData.clubData.clubSetting!.secondUma, submitterData.clubData.clubSetting!.thirdUma, submitterData.clubData.clubSetting!.fourthUma]
      
      // update each participant data
      for (const [i, participant] of payload.participantList.entries()) {
        //current participant data
        const userData = await db.user.findFirstOrThrow({
          where: {
            id: participant.userId
          },
          include: {
            rtData: true
          }
        })
        const baseRP = [userData.rtData.first, userData.rtData.second, userData.rtData.third, userData.rtData.fourth]

        //determine modifier (effect only in RP from score)
        const skillCoef = avgSkill - userData.rtData.skillIndex
        let bonusFromScore = 0
        if (skillCoef < -1) {
          bonusFromScore = (((participant.score - (matchType.totalScore/4)) * skillCoef)/100)
        } else {
          bonusFromScore = ((participant.score - (matchType.totalScore/4))/100)
        }
        
        // determine uma and RP gain
        let gainUma = 0
        let gainRP = 0 
        const bonusRP = participant.score > matchType.totalScore/2 ? userData.rtData.second : participant.score < -(matchType.totalScore/2) ? userData.rtData.third : 0
        switch(participant.draw) {
          case 0: 
            gainUma = baseUma[participant.position] + ((participant.score - (matchType.totalScore/4))/100)
            gainRP =  baseRP[participant.position]
            break
          case 1: 
            gainUma = ((baseUma[participant.position] + baseUma[participant.position + 1])/2) + ((participant.score - (matchType.totalScore/4))/100)
            gainRP =  ((baseRP[participant.position] + baseRP[participant.position + 1])/2)
            break
          case 2: 
            gainUma = ((baseUma[participant.position] + baseUma[participant.position + 1] + baseUma[participant.position + 2])/3) + ((participant.score - (matchType.totalScore/4))/100)
            gainRP = ((baseRP[participant.position] + baseRP[participant.position + 1] + baseRP[participant.position + 2])/3)
            break
          case 3: 
          default: gainUma = 0
        }

        gainRP = Math.round((((rankMultiplier-totalSameMatch)* gainRP)/100) + bonusRP)
        let adjustedRP = userData.currentRP + gainRP
        let newRT = userData.rtData
        let rankedAt = userData.rankedAt
        
        // create RP movement
        if (adjustedRP >= userData.rtData.promotionRP && userData.rtData.promotionRP > 0) {
          //promotion trigger
          //get new RT data
          newRT = await db.rankTittle.findFirstOrThrow({
            where: {
              id: userData.rtId+1
            }
          })
          adjustedRP = newRT.baseRP
          rankedAt = today
          
          transRPInput.push({
            matchId: resultMatch.id,
            rpBefore: userData.currentRP,
            rpAfter: adjustedRP,
            rpMove: gainRP,
            rtChange: true,
            rtIdBefore: userData.rtId,
            rtIdAfter: userData.rtId+1,
          })

        } else if (adjustedRP <= 0 && userData.rtData.demotion) {
          //demotion trigger
          //get new RT data
          newRT = await db.rankTittle.findFirstOrThrow({
            where: {
              id: userData.rtId-1
            }
          })
          adjustedRP = newRT.baseRP
          rankedAt = today

          transRPInput.push({
            matchId: resultMatch.id,
            rpBefore: userData.currentRP,
            rpAfter: adjustedRP,
            rpMove: gainRP,
            rtChange: true,
            rtIdBefore: userData.rtId,
            rtIdAfter: userData.rtId-1,
          })
        } else {
          if (adjustedRP < 0) adjustedRP = 0
          transRPInput.push({
            matchId: resultMatch.id,
            rpBefore: userData.currentRP,
            rpAfter: adjustedRP,
            rpMove: gainRP,
            rtChange: false,
          })
        }

        //update user data
        await db.user.update({
          where: {
            id: userData.id
          },
          data: {
            currentRP: adjustedRP,
            rtId: newRT.id,
            rankedAt: rankedAt
          }
        })

        //upsert uma standing in the club 
        gainUma += submitterData.clubData.clubSetting!.chomboPenalty * participant.chombo + submitterData.clubData.clubSetting!.yakumanBonus * participant.yakuman 
        await db.clubUmaStanding.upsert({
          where: {
            playerId_periodMonth_periodYear: {
              playerId: userData.id,
              periodMonth: today.getMonth(),
              periodYear: today.getFullYear()
            }
          },
          create: {
            playerId: userData.id,
            totalUma: gainUma,
            totalMatch: 1,
            periodMonth: today.getMonth(),
            periodYear: today.getFullYear()
          },
          update: {
            totalUma: {
              increment: gainUma
            },
            totalMatch: {
              increment: 1
            }
          }
        })
        
        //create participant input
        participantInput.push({
          userId: userData.id,
          score: participant.score,
          position: participant.position,
          draw: participant.draw > 0 ? true : false,
          seatRefId: i == 0 ? 701 : i == 1 ? 702 : i == 2 ? 703 : 704,
          playerRtId: participant.playerRtId,
          chombo: participant.chombo,
          ron: participant.ron,
          tsumo: participant.tsumo,
          dealIn: participant.dealIn,
          avgMatchSkill: avgSkill,
          matchId: resultMatch.id,
          gainUma: gainUma
        })
      }

      //submit create many
      await db.matchParticipant.createMany({
        data: participantInput
      })
      await db.transactionRP.createMany({
        data: transRPInput
      })
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