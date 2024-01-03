import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { db } from "$lib/server/db";

export async function load({ locals, params }: LayoutServerLoadEvent) {
  try {
    //check user and throw if needed
    const userMemberData = await db.clubMember.findFirstOrThrow({
      where: {
        userData: {
          firebaseId: locals.firebaseId!
        },
        roleId: {
          notIn: [399, 306]
        },
        clubData: {
          slug: params.slug
        }
      },
      select: {
        id: true,
        roleId: true,
        canApproveMember: true,
        canBuyCC: true,
        canEditAccess: true,
        canEditClubInfo: true,
        canEditClubSetting: true,
        canSubmitMatch: true,
        canSubmitTournament: true,
        clubData: {
          include: {
            clubSetting: true,
          }
        }
      }
    })

    const totalPendingJoin = await db.clubMember.count({
      where: {
        roleId: {
          in: [305, 306]
        },
        clubData: {
          slug: params.slug
        }
      }
    })

    return {
      userMemberData,
      totalPendingJoin
    }
    
  } catch (e) {
    error(403, 'You must join the club to access this page.');
  }
  
}