import { db } from 'server-service/db.js';
import type { PaginationSettings } from '@skeletonlabs/skeleton';

export async function load({params, url}) {
  const slug = params.slug
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('limit') ?? 10)  
  const today = new Date()
  const monthFilter = Number(url.searchParams.get('month') ?? today.getMonth())
  const yearFilter = Number(url.searchParams.get('year') ?? today.getFullYear())

  const totalStandingRow = await db.clubUmaStanding.count({
    where: {
      clubData: {
        slug: slug
      },
      periodMonth: monthFilter,
      periodYear: yearFilter,
    }
  })
  const listStanding = await db.clubUmaStanding.findMany({
    where: {
      clubData: {
        slug: slug
      },
      periodMonth: monthFilter,
      periodYear: yearFilter,
    },
    skip: (currentPage - 1) * takeRow,
    take: takeRow,
    orderBy: [{
      totalUma: 'desc'
    },{
      totalMatch: 'desc'
    }],
    include: {
      userData: true,
    }
  })

  const paginationSetting: PaginationSettings = {
    amounts: [10,20,30,50],
    limit: takeRow,
    page: currentPage,
    size: totalStandingRow,
  }

  return {
    listStanding,
    paginationSetting
  }
}