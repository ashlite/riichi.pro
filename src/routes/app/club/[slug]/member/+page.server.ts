import { firebaseValidation } from '$lib/server/firebaseAdmin.js';
import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const slug = params.slug
  const listMember = await db.clubMember.findMany({
    where: {
      roleId: {
        notIn: [399, 306]
      },
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