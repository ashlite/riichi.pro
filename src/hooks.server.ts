import { firebaseValidation } from '$lib/server/firebaseAdmin'
import type { AuthError } from 'firebase/auth'
import { db } from '$lib/server/db'


export async function handle({event, resolve}) {
  //set user based on appCookie
  const firebaseToken = event.cookies.get('janshi_token')
  // const janshiProToken = event.cookies.get('janshiProToken')
  
  if (firebaseToken && firebaseToken != undefined){
    try {
      const decodedIdToken = await firebaseValidation(event.cookies)
      event.locals.firebaseId = decodedIdToken.sub
    } catch (e) {
      event.locals.firebaseId = undefined
      event.cookies.delete('janshi_token', {path: ''})
    }
  } else {
    event.locals.firebaseId = undefined
  }
   
	return await resolve(event);
}