import type { iRegisterClub } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { error, json } from "@sveltejs/kit";
import { db } from "$lib/server/db.js";
import { countryPhoneFromCode } from "service/country.js";

export async function POST({request, locals}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  try {
    const userData = await db.user.findFirstOrThrow({
      where: {
        id: locals.user?.id
      },
      include: {
        clubList: true,
        rtData: true
      }
    })
    
    userData.clubList.forEach(club => {
      if (club.roleId < 304) {
        throw 'You must not become any main member to any club'
      }
    })

    if (userData.rtData.clubLimit <= userData.clubList.length) {
      throw 'You cannot exceed your club limit'
    }

    const payload: iRegisterClub = await request.json()
    await db.club.create({
      data: {
        countryISO2: payload.countryISO2,
        name: payload.name,
        slug: payload.slug,
        district: payload.district,
        address: payload.address,
        emailContact: payload.emailContact,
        phoneContact: (countryPhoneFromCode(payload.phoneCode!.toString()) + payload.phoneContact?.toString()),
        website: payload.website,
        totalMainMember: 1,
        totalMember: 1,
        clubSetting: {
          create: {}
        },
        statusData: {
          connect: {
            id: 501
          }  
        },
        memberList: {
          create: {
            userId: userData.id,
            roleId: 301,
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