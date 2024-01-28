import { error } from '@sveltejs/kit';
import { db } from 'server-service/db.js';

export async function load({params, parent}) {
  const { slug } = params
  
  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canApproveMember)) {
    error(403, `Forbidden to access`);
  }
  
  const listPending = await db.clubMember.findMany({
    where: {
      roleId: {
        in: [305, 306]
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
    listPending,
  }
}