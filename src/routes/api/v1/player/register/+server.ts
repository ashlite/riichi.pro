import { error, json } from '@sveltejs/kit';
import type { iRegisterData } from 'interface/user';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db';
import type { iRegisterPlayer } from 'interface/user';
import { firebaseValidation } from '$lib/server/firebaseAdmin';

export async function POST({request, cookies}) {
  try {
    const decodedToken = await firebaseValidation(cookies)
    const payload: iRegisterPlayer = await request.json()
    
    //updating user DB
    const user = await db.user.update({
      where: {
        firebaseId: decodedToken.uid
      },
      data: {
        address: payload.address,
        district: payload.district,
        phone: payload.phone.toString(),
        phoneCountry: payload.phoneCountry.toString(),
        realId: payload.realId.toString(),
        sourceRealId: payload.sourceRealId,
        dob: payload.dob,
        genderRefId: payload.gender,
      }
    })

    //creating player
    await db.player.create({
      data: {
        userId: user.id,
        username: `${user.firstName} ${user.lastName}`
      }
    })
    
    return json({ok: true})
  } catch (e) {
    console.log(e)
    throw json({ok: false, message:'e'})
  }

}