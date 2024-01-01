import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({params, parent}) {
  const { slug } = params
  
  try {
    const clubInfo = db.club.findUniqueOrThrow({
      where: {
        slug: slug
      },
    })

    const { userMemberData } = await parent()
    if (userMemberData.roleId > 302 || (userMemberData.roleId == 302 && !userMemberData.canEditClubInfo)) {
      redirect(307, `/app/club/${slug}/`);
    }
    
    return {
      clubInfo
    }
  } catch (e) {
    error(404, 'club not found');
  }
}