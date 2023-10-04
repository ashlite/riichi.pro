import { error, json } from '@sveltejs/kit';
import type { iRegisterData } from 'interface/user';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db';
import { firebaseValidation } from '$lib/server/firebaseAdmin';

export async function POST({request, cookies}) {
  try {
    const decodedIdToken = await firebaseValidation(cookies)
    const payload: iRegisterData = await request.json()
    
    //creating user data
    const user = await db.user.create({
      data: {
        email: decodedIdToken.email!,
        firebaseId: decodedIdToken.uid,
        fullName: payload.fullName,
        nationalityCountryCode: payload.nationalityCountryCode,
        residenceCountryCode: payload.residenceCountryCode,
        address: payload.address,
        district: payload.district,
        dob: payload.dob,
        genderRefId: payload.genderRefId,
        phone: payload.phone,
        phoneCountry: payload.phoneCountry,
        realId: payload.realId,
        sourceRealId: payload.sourceRealId,
        telegramId: payload.telegramId,
        metaData: {
          create: {}
        }
      }
    })
    
    return json({ok: true, id: user.id})
  } catch (e) {
    console.log(e)
    throw json({ok: false, message: 'failed to save user data'})
  }

}