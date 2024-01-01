import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params, parent}) {
  const { slug } = params
  
  const listMember = db.clubMember.findMany({
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

  const listMatchType = db.matchType.findMany({
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

  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canSubmitMatch)) {
    redirect(307, `/app/club/${slug}/`);
  }

  return {
    listMember,
    listMatchType
  }
}