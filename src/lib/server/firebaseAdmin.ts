import { credential } from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL } from "$env/static/private";
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';



function makeApp() {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]!;
  }

  return initializeApp({
    credential: credential.cert({
      privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  })
}

export const firebase = makeApp()
export const firebaseAuth = getAuth(firebase)
export const firestore = getFirestore()

export async function firebaseValidation(cookie: Cookies): Promise<DecodedIdToken> {
  //validate request
  const token = cookie.get("firebase_session")
  if (token) {
    const firebaseData = firebaseAuth.verifySessionCookie(token, true)
    if (!firebaseData) {
      throw error(404, 'Firebase auth not match')
    } 
    return firebaseData
  } else {
    throw error(401, 'Authentication failed, please login first')
  }
}