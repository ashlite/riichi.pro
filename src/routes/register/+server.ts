import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { iRegisterData } from 'interface/user';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db';

export async function POST({request}) {
  try {
    const payload: iRegisterData = await request.json()
    const resultFirebase =  await firebaseAuth.verifyIdToken(payload.firebaseIdToken!)
  
    // creating user db
    await db.user.create({
      data: {
        countryCode: payload.countryISO2,
        email: payload.email,
        firebaseId: resultFirebase.uid,
        firstName: payload.firstName,
        lastName: payload.lastName,
        emailVerified: resultFirebase.email_verified,
      }
    })
  
    return json({ok: true})
  } catch (e) {
    console.log(e)
    throw error(500, 'registration failed')
  }

}