import { db } from 'server-service/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditAccess)) {
    error(403, `Forbidden to access`);
  }
  
  const listMember = await db.clubMember.findMany({
    where: {
      roleId: {
        in: [301, 302]
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