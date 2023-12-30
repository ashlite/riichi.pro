import type { iRegisterClub } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";

export async function POST({cookies, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  
  if (locals.user?.roleId && locals.user.roleId < 102) {
    response.header.ok = false
    response.header.error = 'Unauthorized roles'
  } else {
    try {
      //check cookie
      await firebaseValidation(cookies)
  
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
              userId: locals.user!.id,
              ccBefore: 0,
              ccMove: 100,
              ccAfter: 100,
              type:601,
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
  }
  
  return json(response)
}