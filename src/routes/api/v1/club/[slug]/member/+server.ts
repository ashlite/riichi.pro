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
    if (!locals.user) {
      throw 'You must login to continue'
    }
    //check cookie
    await firebaseValidation(cookies)

    let whereInput: Prisma.ClubMemberWhereInput
    const searchName = url.searchParams.get('name')
    const searchID = url.searchParams.get('id')
    if (searchName) {
      whereInput = {
        active: true,
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
        active: true,
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
        active: true,
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
    console.log(e)
    response.header.ok = false
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      response.header.error = e.message    
    } else {
      response.header.error = e as string
    }
  }

  return json(response)
}