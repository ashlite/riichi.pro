import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";


export async function PATCH({request, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    //check image
    const payload: Prisma.ClubUpdateInput = await request.json()
    
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user?.id,
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