import type { iClubOfficialAction } from "interface/club.js";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";

export async function POST({locals, params, request}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  try {
    if(locals.user && locals.user.roleId >= 102) {
      const payload: iClubOfficialAction = await request.json()
      
      if (payload.actionId == 502) {
        //approving club
        await db.club.update({
          where: {
            id: params.uuid,
            clubStatusId: 501
          },
          data: {
            clubStatusId: 502,
            currentCC: 100,
            transactionList: {
              create: {
                userId: locals.user.id,
                ccBefore: 0,
                ccMove: 100,
                ccAfter: 100,
                type:601,
              }
            }
          }
        })
      } else if (payload.actionId == 504) {
        //ban temporary
        await db.club.update({
          where: {
            id: params.uuid,
            clubStatusId: 502
          },
          data: {
            clubStatusId: 504,
            officialNotes: payload.notes
          }
        })
      } else if (payload.actionId == 505) {
        //rejecting club to Inactive temporary
        await db.club.update({
          where: {
            id: params.uuid,
            clubStatusId: {
              in: [501, 502, 504, 506]
            }
          },
          data: {
            clubStatusId: 505,
            officialNotes: payload.notes
          }
        })
      } else if (payload.actionId == 506) {
        await db.club.update({
          where: {
            id: params.uuid,
            clubStatusId: 501
          },
          data: {
            clubStatusId: 506,
            officialNotes: payload.notes
          }
        })
      }
      
      response.header.ok = true
    } else {
      response.header.ok = false
      response.header.error = "Forbidden access"
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