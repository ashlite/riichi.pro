import { db } from "server-service/db";
import { redirect } from '@sveltejs/kit';
// import type { iPagination } from 'interface/pageMeta.js';
import type { Prisma } from '@prisma/client';
import { error } from '@sveltejs/kit';

export async function load({ url, locals, params }) {
  try {
    //check user and throw if needed
    const clubData = await db.club.findFirstOrThrow({
      where: {
        slug: params.slug
      }, 
      include: {
        clubSetting: true
      }
    })
    const userMemberData = await db.clubMember.findFirst({
      where: {
        userData: {
          id: locals.user?.id
        },
        clubData: {
          slug: params.slug
        }
      },
      select: {
        id: true,
        roleId: true,
        userId: true,
        canApproveMember: true,
        canBuyCC: true,
        canEditAccess: true,
        canEditClubInfo: true,
        canEditClubSetting: true,
        canSubmitMatch: true,
        canSubmitTournament: true,
      }
    })

    return {
      clubData,
      userMemberData
    }
    
  } catch (e) {
    error(403, 'You must join the club to access this page.');
  }
}