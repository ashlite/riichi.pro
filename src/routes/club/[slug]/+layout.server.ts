import { db } from "server-service/db";
import { error } from '@sveltejs/kit';

export async function load({ locals, params }) {
  try {
    //check user and throw if needed
    const clubData = await db.club.findFirstOrThrow({
      where: {
        slug: params.slug
      }, 
      include: {
        clubSetting: true,
      }
    })
    const listMember = await db.clubMember.findMany({
      where: {
        clubId: clubData.id,
        roleId: {
          lte: 306
        }
      },
      select: {
        id: true,
        userData: {
          select: {
            avatarUrl: true,
            fullName: true,
            id: true
          }
        }
      },      
      take: 8,
      orderBy: {
        roleId: 'asc'
      }
    })
    let userMemberData = null
    if (locals.user) {
      userMemberData = await db.clubMember.findFirst({
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

    }

    return {
      clubData,
      userMemberData,
      listMember
    }
    
  } catch (e) {
    error(404, 'Club not found.');
  }
}