import { db } from 'server-service/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  const { userMemberData } = await parent()
  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditClubInfo)) {
    error(403, `Forbidden to Access`);
  }
  
  try {
    const clubInfo = await db.club.findUniqueOrThrow({
      where: {
        slug: slug
      },
    })

    
    return {
      clubInfo
    }
  } catch (e) {
    error(404, 'club not found');
  }
}