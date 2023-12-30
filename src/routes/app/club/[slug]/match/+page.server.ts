import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, parent}) {
  const { userMemberData } = await parent()
  const { slug } = params
  
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canSubmitMatch)) {
    redirect(307, `/app/club/${slug}/`);
  }

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

  const listMatchType = await db.matchType.findMany({
    where: {
      OR: [{
        official: true,
      }, {
        clubData: {
          slug: slug
        }
      }]
    }
  })

  return {
    listMember,
    listMatchType
  }
}