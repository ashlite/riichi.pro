import type { iClubAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";

export async function POST({request, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  try {    
    const payload: iClubAction = await request.json()

    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user?.id,
        clubData: {
          slug: slug
        }
      },
      include: {
        clubData: {
          select: {
            clubStatusId: true
          }
        }
      }
    })

    if (payload.actionId == 599 && userMember.roleId == 301 && [504, 506].includes(userMember.clubData.clubStatusId)) {
      await db.club.update({
        where: {
          id: userMember.clubId
        },
        data: {
          clubStatusId: 599
        }
      })
    } else {
      response.header.ok = false
      response.header.error = 'Permission error for selected operation'
    }

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