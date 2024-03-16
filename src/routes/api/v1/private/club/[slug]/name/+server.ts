import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { db } from "server-service/db.js";


export async function PATCH({request, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params

  try {
    //check image
    const payload: {name: string, slug: string} = await request.json()
    
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user?.id,
        roleId: 301,
        clubData: {
          slug: slug,
          clubStatusId: {
            in: [501, 506]
          }
        }
      }, 
      select: {
        clubId: true
      }
    })
    
    await db.club.update({
      where: {
        id: userMember.clubId
      },
      data: {
        name: payload.name,
        slug: payload.slug.toLowerCase(),
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