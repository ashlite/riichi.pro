import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';

export async function load({locals}) {

  const profileData = await db.user.findUniqueOrThrow({
    where: {
      firebaseId: locals.firebaseId!
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