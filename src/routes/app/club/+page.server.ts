import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';

export async function load({locals, cookies}) {
  await firebaseValidation(cookies)

  const listClub = await db.clubMember.findMany({
    where: {
      active: true,
      userId: locals.user?.id
    },
    select: {
      id: true,
      clubData: {
        select: {
          name: true,
          emblemFile: true,
          countryISO2: true,
          slug: true,
          clubStatusId: true,
        }
      },
      roleData: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return {
    listClub,
    clubLimit: locals.user?.rtData.clubLimit
  }
}