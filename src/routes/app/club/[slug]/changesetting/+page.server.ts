import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  const { userMemberData } = await parent()

  if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditClubInfo)) {
    throw redirect(307, `/app/club/${slug}/`)
  }
  
  try {
    const clubSetting = await db.clubSetting.findFirstOrThrow({
      where: {
        clubData: {
          slug: slug
        }
      }
    })
    return {
      clubSetting
    }
  } catch (e) {
    throw error(404, 'club not found')
  }
}