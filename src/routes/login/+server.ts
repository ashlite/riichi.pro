import { error, json } from '@sveltejs/kit';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db';

export async function POST({request, cookies}) {
  try {
    const idToken = await request.text()
    const resultFirebase = await firebaseAuth.verifyIdToken(idToken)

    if (resultFirebase) {
      const expiresIn = 60 * 60 * 24 * 7 * 1000;
      const options = { maxAge: expiresIn, httpOnly: true, secure: true };
      
      //firebaseCookie
      const sessionCookie = await firebaseAuth.createSessionCookie(idToken, {expiresIn})
      cookies.set('firebase_session', sessionCookie, options)
      
      return json({ok: true})
    }
    throw error(500, 'firebase Error')
    
  } catch (e) {
    console.log(e)
    throw error(500, 'login failed')
  }

}