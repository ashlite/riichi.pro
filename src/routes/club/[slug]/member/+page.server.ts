import { db } from "server-service/db";
import { error } from '@sveltejs/kit';
import type { PaginationSettings } from "@skeletonlabs/skeleton";

export async function load({ params, url }) {
  try {
    const currentPage = Number(url.searchParams.get('page') ?? 1)
    const takeRow = Number(url.searchParams.get('limit') ?? 10)  

    const listMemberFull = await db.clubMember.findMany({
      where: {
        clubData: {
          slug: params.slug
        },
        roleId: {
          lte: 306
        }
      },
      select: {
        id: true,
        roleData: true,
        userData: {
          select: {
            avatarUrl: true,
            fullName: true,
            id: true,
            rtData: true,
            currentRP: true,
          }
        }
      },      
      orderBy: {
        roleId: 'asc'
      },
    })
    const totalMember = await db.clubMember.count({
      where: {
        clubData: {
          slug: params.slug
        },
        roleId: {
          lte: 306
        }
      }
    })

    const paginationSettings: PaginationSettings = {
      page: currentPage,
      limit: takeRow,
      size: totalMember,
      amounts: [10,20,50],
    }

    return {
      listMemberFull,
      paginationSettings
    }
    
  } catch (e) {
    error(403, 'You must join the club to access this page.');
  }
}