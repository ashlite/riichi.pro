import type { Cookies } from '@sveltejs/kit';
import { db } from './db';
import { firebaseAuth } from './firebaseAdmin';
import { error } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export async function validateUser(cookie: Cookies) {
  try {
    const token = cookie.get("kaze_token")
    const firebaseUser = token ? await firebaseAuth.verifyIdToken(token) : null;
    if (firebaseUser) {
      const userData = await db.user.findUniqueOrThrow({
        where: {
          firebaseId: firebaseUser.uid
        }
      })
      return userData
    }
  } catch (e) {
    cookie.set("kaze_token", "", { maxAge: -1 });
    error(404, "User Not found");
  }
}