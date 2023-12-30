import type { iMemberAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { error, json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";
import { uploadImage } from "service/s3.js";
import { env } from '$env/dynamic/public'

export async function PATCH({request, cookies, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    if (!locals.user) {
      throw 'You must login to continue'
    }
    //check cookie
    await firebaseValidation(cookies)

    //check image
    const payload: Prisma.ClubUpdateInput = await request.json()
    
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user.id,
        clubData: {
          slug: slug
        }
      },
      select: {
        roleId: true,
        canEditClubInfo: true,
        clubData: {
          select: {
            id: true,
          }
        }
      }
    })

    
    if (userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canEditClubInfo)) {
      await db.club.update({
        where: {
          id: userMember.clubData.id
        },
        data: {
          countryISO2: payload.countryISO2,
          district: payload.district,
          address: payload.address,
          emailContact: payload.emailContact,
          phoneContact: payload.phoneContact,
          website: payload.website,
          description: payload.description
        }
      })
      response.header.ok = true
      
    } else {
      response.header.ok = false
      response.header.error = "You dont have enough permission"
    }

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