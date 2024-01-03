import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  try {
    const clubInfo = await db.club.findUniqueOrThrow({
      where: {
        slug: slug
      },
    })

    const { userMemberData } = await parent()
    if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditClubInfo)) {
      error(403, `Forbidden to Access`);
    }
    
    return {
      clubInfo
    }
  } catch (e) {
    error(404, 'club not found');
  }
}