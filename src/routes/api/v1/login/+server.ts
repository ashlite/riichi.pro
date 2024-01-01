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
      const expiresIn = 60 * 60 * 24 * 7 * 1000; //7 days expiration
      const options = { maxAge: expiresIn/1000, httpOnly: true, secure: true, path:'/' };
      
      //get user and set custom claim
      // const loginUser = await await db.user.findFirstOrThrow({
      //   where: {
      //     firebaseId: resultFirebase.uid
      //   },
      //   include: {
      //     rtData: true
      //   }
      // })
      // firebaseAuth.setCustomUserClaims(resultFirebase.uid, {
      //   userId: loginUser.id,
      //   roleId: loginUser.roleId,
      //   banStatus: loginUser.banStatus,
      //   banedAt: loginUser.banedAt,
      //   banExpiration: loginUser.banExpiration,
      //   banReason: loginUser.banReason,
      //   rtName: loginUser.rtData.name,
      // })

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