import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db.js";

export async function PATCH({request, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    const payload: Prisma.ClubSettingUpdateInput = await request.json()
    
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userData: {
          id: locals.user?.id
        },
        clubData: {
          slug: slug
        }
      },
      select: {
        roleId: true,
        canEditClubSetting: true,
        clubData: {
          select: {
            id: true,
          }
        }
      }
    })

    
    if (userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canEditClubSetting)) {
      await db.clubSetting.update({
        where: {
          clubId: userMember.clubData.id
        },
        data: payload
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
      console.log(e)
      response.header.error = JSON.stringify(e)
    }
  }

  return json(response)
}