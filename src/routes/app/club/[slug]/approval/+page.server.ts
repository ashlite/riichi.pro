import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';

export async function load({params, parent}) {
  const { slug } = params
  
  const listPending = db.clubMember.findMany({
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

  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canApproveMember)) {
    redirect(307, `/app/club/${slug}/`);
  }

  return {
    listPending,
  }
}