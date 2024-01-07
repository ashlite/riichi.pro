import { db } from '$lib/server/db.js';

export async function load({locals}) {

  const profileData = await db.user.findUniqueOrThrow({
    where: {
      id: locals.user!.id
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