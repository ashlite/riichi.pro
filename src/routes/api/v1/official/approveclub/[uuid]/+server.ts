import type { iRegisterClub } from "interface/club";
import { error, json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";

export async function POST({cookies, locals, params}) {
  try {
    if (locals.user?.roleId && locals.user.roleId < 102) {
      throw error(403, 'You must have official roles')
    }

    //check cookie
    await firebaseValidation(cookies)

    //approving club
    const result = await db.club.update({
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

    return json({ok: true})

  } catch (e) {
    console.log(e)
    return json({ok: false, message:'Error when approving, please contact developer'})
  }

}