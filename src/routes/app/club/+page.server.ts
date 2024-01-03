import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';

export async function load({locals}) {
  const listClub = await db.clubMember.findMany({
    where: {
      roleId: {
        not: 399
      },
      userData: {
        firebaseId: locals.firebaseId!
      }
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
    listClub
  }
}