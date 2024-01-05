import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { cookieValidationStrict } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";
import type { iMemberPicker } from "interface/club.js";
import { error } from "@sveltejs/kit";

export async function GET({cookies, params, url}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    //check cookie
    await cookieValidationStrict(cookies)

    let whereInput: Prisma.ClubMemberWhereInput
    const searchName = url.searchParams.get('name')
    const searchID = url.searchParams.get('id')
    if (searchName) {
      whereInput = {
        roleData: {
          id: {
            notIn: [399, 306]
          }
        },
        clubData: {
          slug: slug
        },
        roleId: {
          lt: 306
        },
        userData: {
          fullName: {
            contains: searchName,
            mode: 'insensitive'
          }
        }
      }
    } else if (searchID) {
      whereInput = {
        roleData: {
          id: {
            notIn: [399, 306]
          }
        },
        clubData: {
          slug: slug
        },
        roleId: {
          lt: 306
        },
        userData: {
          id: Number(searchID)
        }
      }
    } else {
      whereInput = {
        roleData: {
          id: {
            notIn: [399, 306]
          }
        },
        clubData: {
          slug: slug
        },
        roleId: {
          lt: 306
        },
      }
    }
 
    const result =  await db.clubMember.findMany({
      where: whereInput,
      include: {
        userData: {
          include: {
            rtData: true
          }
        }
      }
    })
    
    response.header.ok = true
    response.data = result
    
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

export async function PATCH({cookies, params, request}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {

    //check cookie
    await firebaseValidation(cookies)

    const payload = await request.json()

    switch (payload.type) {
      case 'access':
        await db.clubMember.update({
          where: {
            id: payload.targetId,
          },
          data: {
            canApproveMember: payload.canApproveMember,
            canEditClubInfo: payload.canEditClubInfo,
            canEditClubSetting: payload.canEditClubSetting,
            canSubmitMatch: payload.canSubmitMatch,
            canEditAccess: payload.canEditAccess,
            canSubmitTournament: payload.canSubmitTournament,
            canBuyCC: payload.canBuyCC,
          }
        })
        break
    }
        
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

export async function POST({cookies, params}) {
  //apply to join to club, post by user
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    //check cookie
    const decodeToken = await cookieValidationStrict(cookies)

    const [userData, clubData] = await db.$transaction([
      db.user.findFirstOrThrow({
        where: {
          firebaseId: decodeToken.sub
        },
        include: {
          rtData: true,
          clubList: true
        }
      }),
      db.club.findFirstOrThrow({
        where: {
          slug: slug
        },
        include: {
          clubSetting: true
        }
      })
    ])

    //check user rtdata limit is not 
    if (userData.clubList.length >= userData.rtData.clubLimit) error(403, 'Club limit achieved')
    //check duplicate join
    userData.clubList.forEach(club => {
      if (club.clubId == clubData.id) error(403, 'User already in joined or in request')
    })

    //check if auto approve or not
    if (clubData.clubSetting!.autoApproveMember) {
      await db.clubMember.create({
        data: {
          userId: userData.id,
          clubId: clubData.id,
          roleId: 304,
        }
      })
    } else {
      await db.clubMember.create({
        data: {
          userId: userData.id,
          clubId: clubData.id,
          roleId: 306,
        }
      })
    }
    
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