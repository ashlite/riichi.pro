import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';

export async function load({locals, cookies}) {
  const decodedToken = await firebaseValidation(cookies)

  const profileData = await db.user.findUniqueOrThrow({
    where: {
      id: locals.user?.id
    },
    include: {
      rtData: true,
      genderData: true,
      metaData: true,
    }
  })

  return {
    profileData
  }
}