import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';

export async function load({params, parent}) {
  const { slug } = params
  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canApproveMember)) {
    throw redirect(307, `/app/club/${slug}/`)
  }
  
  const listPending = await db.clubMember.findMany({
    where: {
      active: true,
      roleId: 306,
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