import { db } from 'server-service/db.js';
import { type PaginationSettings } from '@skeletonlabs/skeleton';

export async function load({ url }) {
  // const rtQuery = url.searchParams.get('')
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('limit') ?? 10)
  const filterRT = url.searchParams.get('rt') ?? 'mix'
  
  const players = await db.user.findMany({
    where: {
      banStatus: false,
      rtId: {
        notIn: (filterRT == 'pro' ? [1,2,3,4,5,6,7,8,9,10] : filterRT == 'ama' ? [1,11,12,13,14,15,16,17,18,19] : [1])
      }
    },
    select: {
      id: true,
      nationalityCountryCode: true,
      fullName: true,
      currentTP: true,
      currentRP: true,
      avatarUrl: true,
      rtId: true,
      seqId: true,
      rtData: true,
      metaData: true,
      clubList: {
        where: {
          roleId: {
            in: [301, 302, 303]
          }
        },
        select: {
          clubData: true
        }
      }
    },
    take: takeRow,
    skip: (takeRow * (currentPage - 1)),
    orderBy: [
      {
        rtId: 'desc'
      }, {
        currentRP: 'desc'
      }, {
        seqId: 'desc'
      }
    ]
  })

  const totalPlayer = await db.user.count({
    where: {
      banStatus: false,
      rtId: {
        notIn: (filterRT == 'pro' ? [1,2,3,4,5,6,7,8,9,10] : filterRT == 'ama' ? [1,11,12,13,14,15,16,17,18,19] : [1])
      }
    },
  })

  const paginationData: PaginationSettings = {
    page: currentPage,
    limit: takeRow,
    size: totalPlayer,
    amounts: [10, 20, 30, 50]
  }

	return {
		players,
    paginationData
	}
}