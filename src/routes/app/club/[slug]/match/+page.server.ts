import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params, parent}) {
  const { slug } = params

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

  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canSubmitMatch)) {
    error(403, `Forbidden to access`);
  }

  return {
    listMatchType
  }
}