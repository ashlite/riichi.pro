import { type PaginationSettings } from '@skeletonlabs/skeleton';
import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export async function load({ url, locals }) {
  // const rtQuery = url.searchParams.get('')
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('limit') ?? 10)
  const country = url.searchParams.get('country') ?? 'global'
  let whereInput: Prisma.ClubWhereInput

  if (country == 'global') {
    whereInput = {
      clubStatusId: 502
    }
  } else {
    whereInput = {
      clubStatusId: 502,
      countryISO2: country
    }
  }

  const [listClub, totalClub, listClubUser] = await db.$transaction([
    db.club.findMany({
      where: whereInput,
      take: takeRow,
      skip: (takeRow * (currentPage - 1)),
      select: {
        id: true,
        name: true,
        emblemFile: true,
        totalMember: true,
        totalMainMember: true,
        countryISO2: true,
        slug: true
      }
    }),
    db.club.count({
      where: whereInput
    }),
    db.clubMember.findMany({
      where: {
        userId: locals.user?.id,
        roleId: {
          lte: 306
        }
      }
    })
  ])

  const paginationData: PaginationSettings = {
    page: currentPage,
    limit: takeRow,
    size: totalClub,
    amounts: [10, 20, 30, 50]
  }

	return {
		listClub,
    paginationData,
    listClubUser
	}
}