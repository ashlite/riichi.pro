import { firebaseValidation } from 'server-service/firebaseAdmin.js';
import { db } from 'server-service/db.js';

export async function load({params, url}) {
  const slug = params.slug
  const today = new Date()
  const monthFilter = Number(url.searchParams.get('month') ?? today.getMonth())
  const yearFilter = Number(url.searchParams.get('year') ?? today.getFullYear())
  const page = Number(url.searchParams.get('page') ?? 1)
  let limit = Number(url.searchParams.get('limit') ?? 10)
  if (limit < 10) limit = 10
  else if (limit > 100) limit = 100

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
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      totalUma: 'desc'
    },
    include: {
      userData: true,
    }
  })

  return {
    listStanding, totalStandingRow
  }
}