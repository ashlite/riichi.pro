import { firebaseValidation } from '$lib/server/firebaseAdmin'
import type { iUserLocal } from 'interface/user'
import { db } from '$lib/server/db'


export async function handle({event, resolve}) {
  //set user based on appCookie
  const firebaseToken = event.cookies.get('firebase_session')
  if (firebaseToken && firebaseToken != undefined){
    const decodedIdToken = await firebaseValidation(event.cookies)
    const user = await db.user.findUniqueOrThrow({
      where: {
        firebaseId: decodedIdToken.uid
      },
      select: {
        emailVerified: true,
        email: true,
        firstName: true,
        lastName: true,
        id: true,
        roleId: true,
        countryCode: true,
        playerData: {
          select: {
            id: true,
            alias: true,
            currentRP: true,
            currentMP: true,
            rtData: true
          }
        }
      }
    })
    event.locals.user = user
  } else {
    event.locals.user = undefined
  }
   
	return await resolve(event);
}