import { error, json } from '@sveltejs/kit';
import type { iRegisterData } from 'interface/user';
import { firebaseAuth } from 'service/firebase.js';
import { isSignInWithEmailLink } from 'firebase/auth';
import { db } from '$lib/server/db';

export async function GET({request, url}) {
  try {
    
    const id = url.searchParams.get('id')
    if (!id) {
      throw error(422, 'Error reading response')
    }
    //validating request to firebase
    if(isSignInWithEmailLink(firebaseAuth, url)) {
      //updating UserData
      await db.user.update({
        where: {
          id: id
        }
      })
    }

    
    return json({ok: true, id: user.id})
  } catch (e) {
    console.log(e)
    throw json({ok: false, message: 'failed to save user data'})
  }

}