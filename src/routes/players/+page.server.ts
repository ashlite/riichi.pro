import { db } from '$lib/server/db.js';
import type { iPagination } from 'interface/pageMeta.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
  if (locals.status == 'register') {
    redirect(307, '/register');
  }
  // const rtQuery = url.searchParams.get('')
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('take') ?? 10)
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
      uuid: true,
      nationalityCountryCode: true,
      fullName: true,
      currentTP: true,
      currentRP: true,
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
  })

  const totalPlayer = await db.user.count({
    where: {
      banStatus: false,
      rtId: {
        notIn: (filterRT == 'pro' ? [1,2,3,4,5,6,7,8,9,10] : filterRT == 'ama' ? [1,11,12,13,14,15,16,17,18,19] : [1])
      }
    },
  })

  const pageMeta: iPagination = {
    currentPage: currentPage,
    rowPerPage: takeRow,
    totalRow: totalPlayer,
    totalPage: Math.ceil(totalPlayer/takeRow),
  }

	return {
		players: players,
    meta: pageMeta
	}
}