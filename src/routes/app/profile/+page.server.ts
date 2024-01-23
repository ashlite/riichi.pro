import { db } from '$lib/server/db.js';

export async function load({locals}) {

  const [profileData, listGender] = await db.$transaction([
    db.user.findUniqueOrThrow({
      where: {
        id: locals.user!.id
      },
      include: {
        rtData: true,
        genderData: true,
        metaData: true,
      }
    }),
    db.refHelper.findMany({
      where: {
        group: 'gender_user'
      }
    })
  ]) 


  return {
    profileData,
    listGender
  }
}