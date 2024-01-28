import { db } from 'server-service/db.js';

export async function load({locals}) {
  const listClub = await db.clubMember.findMany({
    where: {
      userId: locals.user!.id,
      roleId: {
        not: 399
      },
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