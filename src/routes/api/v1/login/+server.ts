import { json } from '@sveltejs/kit';
import { firebaseAuth } from '$lib/server/firebaseAdmin';
import { db } from '$lib/server/db.js';
import type { iGlobalResponse } from 'interface/utils.js';

export async function POST({request, cookies}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  try {
    const idToken = await request.text()
    const resultFirebase = await firebaseAuth.verifyIdToken(idToken)

    if (resultFirebase) {
      const expiresIn = 60 * 60 * 24 * 7 * 1000;
      const options = { maxAge: expiresIn/1000, httpOnly: true, secure: true, path:'/' };
      
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
    response.header.error = 'Login failed'
  }
  
  return json(response)
}