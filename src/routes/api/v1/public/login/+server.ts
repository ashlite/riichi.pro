import { json } from '@sveltejs/kit';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { env } from '$env/dynamic/private';
import type { iGlobalResponse } from 'interface/utils.js';
import { db } from '$lib/server/db.js';

export async function POST({request, cookies}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  try {
    const idToken = await request.text()
    const resultFirebase = await firebaseAuth.verifyIdToken(idToken, true)
    const firebaseUser = await firebaseAuth.getUser(resultFirebase.sub)
    const today = new Date()

    if (resultFirebase) {
      // upsert user data
      await db.user.upsert({
        where: {
          id: resultFirebase.sub
        }, 
        create: {
          id: resultFirebase.sub,
          email: resultFirebase.email!,
          fullName: firebaseUser.displayName!,
          avatarUrl: firebaseUser.photoURL,
          lastLogin: today
        }, 
        update: {
          lastLogin: today
        }
      })

      const expiresIn = 60 * 60 * 24 * 7 * 1000; //7 days expiration
      const options = { maxAge: expiresIn/1000, httpOnly: true, secure: env.NODE_ENV === 'production', path:'/' };

      //firebaseCookie
      const sessionCookie = await firebaseAuth.createSessionCookie(idToken, {expiresIn})
      cookies.set('janshi_token', sessionCookie, options)

      response.header.ok = true
    } else {
      response.header.ok = false
      response.header.error = 'Failed creating cookies'
    }
    
  } catch (e) {
    console.log(e)
    response.header.ok = false
    response.header.error = 'Login failed or user data not found'
  }
  
  return json(response)
}