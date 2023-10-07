import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';

export async function load({locals, params}) {
  const slug = params.slug
  const listMember = await db.clubMember.findMany({
    where: {
      active: true,
      clubData: {
        slug: slug
      }
    },
    include: {
      userData: {
        include: {
          rtData: true
        }
      },
      roleData: true
    },
    orderBy: {
      roleId: 'asc'
    }
  })

  return {
    listMember,
  }
}