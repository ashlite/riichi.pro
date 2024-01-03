import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";
import type { iMemberPicker } from "interface/club.js";

export async function GET({cookies, locals, params, url}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    //check cookie
    await firebaseValidation(cookies)

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

export async function PATCH({cookies, locals, params, request}) {
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