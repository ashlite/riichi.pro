import type { iRegisterClub } from "interface/club";
import { error, json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";

export async function POST({request, cookies, locals}) {
  try {
    if (!locals.user?.playerData || locals.user?.banStatus) {
      throw error(403, 'You must an active player to create a club')
    }

    //check cookie
    await firebaseValidation(cookies)
    const clubList = await db.clubMember.findMany({
      where: {
        playerId: locals.user.playerData.id,
        active: true
      }
    })
    
    clubList.forEach(club => {
      if (club.roleId < 304) {
        throw error(403, 'You must not become any main member to any club')
      }
    })

    if (locals.user.playerData.rtData.clubLimit == clubList.length) {
      throw error(403, 'You cannot exceed your club limit')
    }

    const payload: iRegisterClub = await request.json()
    await db.club.create({
      data: {
        countryISO2: payload.countryISO2,
        name: payload.name,
        slug: payload.slug,
        address: payload.address,
        emailContact: payload.emailContact,
        phoneContact: (payload.phoneCode?.toString() ?? '-' + payload.phoneContact?.toString() ?? '-'),
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
            playerId: locals.user.playerData.id,
            roleId: 301,
          }
        }
      }
    })

    return json({ok: true})

  } catch (e) {
    console.log(e)
    return json({ok: false, message:JSON.stringify(e)})
  }

}