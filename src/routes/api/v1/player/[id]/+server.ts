import { error } from '@sveltejs/kit';
import { db } from 'server-service/db';
import { Prisma } from "@prisma/client";

export async function GET({params}) {
  try {
    const id = params.id
    const result = await db.user.findFirstOrThrow({
      where: {
        id: id
      },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        currentRP: true,
        currentTP: true,
        rtData: {
          select: {
            name: true,
          }
        },
        clubList: {
          select: {
            createdAt: true,
            roleId: true,
            roleData: {
              select: {
                name: true
              }
            },
            clubData: {
              select: {
                name: true,
                slug: true,
              }
            }
          }
        },
        nationalityCountryCode: true,
        residenceCountryCode: true,
        genderData: true,
        joinedAt: true,
        metaData: true,
      }
    })
    return new Response(JSON.stringify(result)) 

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      error(500, e.message)    
    } else {
      error(500, "Internal Server Error2")
    }
  }
}