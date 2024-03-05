//mylib
import { db } from 'server-service/db.js';
//prisma
import { Prisma } from '@prisma/client';
// import { redirect } from '@sveltejs/kit';
//skeleton
import type { PaginationSettings } from '@skeletonlabs/skeleton';

export async function load({ params, parent, url}) {
  const { slug } = params
  const today = new Date()
  // let startDate = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
  // if (url.searchParams.has('startDate')) {
  //   startDate = new Date(url.searchParams.get('startDate')!)
  // }
  // let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
  // if (url.searchParams.has('endDate')) {
  //   endDate = new Date(url.searchParams.get('endDate')!)
  // }
  // const typeDate: 'create' | 'match' | string = url.searchParams.get('typeDate') ?? 'match'
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('limit') ?? 10)
  let searchQuery: Prisma.MatchWhereInput

  const { userMemberData } = await parent()
  // if (typeDate == 'match') {
  //   searchQuery = {
  //     clubId: userMemberData.clubData.id,
  //     matchAt: {
  //       gte: startDate,
  //       lte: endDate
  //     }
  //   }
  // } else {
  //   searchQuery = {
  //     clubId: userMemberData.clubData.id,
  //     createdAt: {
  //       gte: startDate,
  //       lte: endDate
  //     }
  //   }
  // }

  const listPastMatch = await db.match.findMany({
    where: {
      clubId: userMemberData.clubData.id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: (currentPage-1) * takeRow,
    take: takeRow,
    include: {
      creatorMemberData: {
        select: {
          userData: {
            select: {
              fullName: true,
            }
          }
        }
      },
      typeData: true,
      participantList: {
        orderBy: {
          seatRefId: 'asc'
        },
        select: {
          avgMatchSkill: true,
          chombo: true,
          gainUma: true,
          score: true,
          position: true,
          draw: true,
          seatRefData: {
            select: {
              name: true,
              id: true
            }
          },
          matchRt: {
            select: {
              name: true
            }
          },
          userData: {
            select: {
              avatarUrl: true,
              fullName: true,
              id: true,
            }
          }
        }
      }
    }
  })

  const totalPastMatch = await db.match.count({
    where: {
      clubId: userMemberData.clubData.id,
    }
  })

  const paginationSetting: PaginationSettings = {
    amounts: [10,20,30,50],
    limit: takeRow,
    page: currentPage,
    size: totalPastMatch
  }

  return {
    listPastMatch,
    paginationSetting
  }
}