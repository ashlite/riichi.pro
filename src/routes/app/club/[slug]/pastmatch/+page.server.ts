// import { db } from '$lib/server/db.js';
// import { Prisma } from '@prisma/client';
// import { redirect } from '@sveltejs/kit';

// export async function load({ params, parent, url}) {
//   const { slug } = params
//   const today = new Date()
//   const startDate = url.searchParams.get('startDate') ?? new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
//   const endDate = url.searchParams.get('endDate') ?? new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
//   const typeDate: 'create' | 'match' | string = url.searchParams.get('typeDate') ?? 'match'
//   const page = Number(url.searchParams.get('page') ?? 1)
//   let searchQuery: Prisma.MatchWhereInput
//   let limit = Number(url.searchParams.get('limit') ?? 10)
//   if (limit < 10) limit = 10
//   else if (limit > 100) limit = 100

//   if (typeDate == 'match') {
//     searchQuery = {
//       clubData: {
//         slug: slug
//       },
//       matchAt: {
//         gte: startDate,
//         lte: endDate
//       }
//     }
//   } else {
//     searchQuery = {
//       clubData: {
//         slug: slug
//       },
//       createdAt: {
//         gte: startDate,
//         lte: endDate
//       }
//     }
//   }

//   const listPastMatch = db.match.findMany({
//     where: searchQuery,
//     orderBy: {
//       matchAt: 'desc'
//     },
//     skip: (page-1) * limit,
//     take: limit,
//     include: {
//       typeData: true,
//       _count: true,
//       participantList: true
//     }
//   })

//   return {
//     listPastMatch
//   }
// }