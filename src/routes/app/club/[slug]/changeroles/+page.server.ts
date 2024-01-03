import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  const listMember = await db.clubMember.findMany({
    where: {
      roleId: {
        in: [301, 302, 303]
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

  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditAccess)) {
    error(403, `Forbidden to access`);
  }
  
  return {
    listMember,
  }
}