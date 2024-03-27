import type { iRegisterClub } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";

export async function POST({locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
    try {
      const userData = await db.user.findFirstOrThrow({
        where: {
          id: locals.user!.id,
          roleId: {
            gte: 102
          }
        }
      })
  
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
              userId: userData.id,
              ccBefore: 0,
              ccMove: 100,
              ccAfter: 100,
              typeId: 601,
            }
          }
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