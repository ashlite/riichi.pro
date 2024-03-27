import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";
import { error } from "@sveltejs/kit";

export async function POST({locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  const ccBeta = 300

  try {
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
        userId: true,
        roleId: true,
        canBuyCC: true,
        clubData: {
          select: {
            id: true,
            currentCC: true
          }
        }
      }
    })

    
    if (userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canBuyCC)) {
      if (userMember.clubData.currentCC >= 50) error(422, `curentCC ${userMember.clubData.currentCC} is more than 50`)
      
      await db.club.update({
        where: {
          id: userMember.clubData.id
        },
        data: {
          currentCC: {
            increment: ccBeta
          },
          transactionList: {
            create: {
              ccAfter: userMember.clubData.currentCC + ccBeta,
              ccBefore: userMember.clubData.currentCC,
              ccMove: ccBeta,
              typeId: 605,
              userId: userMember.userId
            }
          }
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
      console.log(e)
      response.header.error = JSON.stringify(e)
    }
  }

  return json(response)
}