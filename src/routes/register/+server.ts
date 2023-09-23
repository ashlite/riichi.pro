import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { iRegisterData } from 'interface/user';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db';
import type { iUserLocal } from 'interface/user';

export async function POST({request, cookies}) {
  try {
    const payload: iRegisterData = await request.json()
    const resultFirebase =  await firebaseAuth.verifyIdToken(payload.firebaseIdToken!)
    const expiresIn = 60 * 60 * 24 * 7 * 1000;
  
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
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    
    //firebaseCookie
    const sessionCookie = await firebaseAuth.createSessionCookie(payload.firebaseIdToken!, {expiresIn})
    cookies.set('firebase_session', sessionCookie, options)
    
    return json({ok: true})
  } catch (e) {
    console.log(e)
    throw error(500, 'registration failed')
  }

}