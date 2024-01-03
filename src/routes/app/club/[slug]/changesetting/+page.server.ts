import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  try {
    const clubSetting = await db.clubSetting.findFirstOrThrow({
      where: {
        clubData: {
          slug: slug
        }
      }
    })
    
    const { userMemberData } = await parent()
    if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditClubInfo)) {
      error(403, `Forbidden to access`);
    }
    return {
      clubSetting
    }
  } catch (e) {
    error(404, 'club not found');
  }
}