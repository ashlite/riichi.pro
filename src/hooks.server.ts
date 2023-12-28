import { firebaseValidation } from '$lib/server/firebaseAdmin'
import type { AuthError } from 'firebase/auth'
import { db } from '$lib/server/db'


export async function handle({event, resolve}) {
  //set user based on appCookie
  const firebaseToken = event.cookies.get('firebase_session')
  // const janshiProToken = event.cookies.get('janshiProToken')
  
  if (firebaseToken && firebaseToken != undefined){
    try {
      const decodedIdToken = await firebaseValidation(event.cookies)
      const user = await db.user.findUnique({
        where: {
          firebaseId: decodedIdToken.uid
        },
        select: {
          email: true,
          fullName: true,
          uuid: true,
          id: true,
          roleId: true,
          banStatus: true,
          banedAt: true,
          banExpiration: true,
          banReason: true,
          rtData: {
            select: {
              name: true,
              skillIndex: true,
              baseRP: true,
              promotionRP: true,
              clubLimit: true,
            }
          },
          currentRP: true
        }
      })
      if (user) {
        event.locals.user = user
        event.locals.status = 'login'
      } else {
        event.locals.user = undefined
        event.locals.status = 'register'
      }
    } catch (e) {
      event.locals.user = undefined
      event.locals.status = undefined
      /* @migration task: add path argument */ event.cookies.delete('firebase_session')
    }
    
  } else {
    event.locals.user = undefined
    event.locals.status = undefined
  }
   
	return await resolve(event);
}