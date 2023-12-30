import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';
import type { iPagination } from 'interface/pageMeta.js';
import type { Prisma } from '@prisma/client';

export async function load({ url, locals }) {
  if (locals.status == 'register') {
    redirect(307, '/register');
  }

  // const rtQuery = url.searchParams.get('')
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('take') ?? 10)
  const country = url.searchParams.get('country') ?? 'global'
  const listJoinClub: string[] = []
  const listPendingClub: string[] = []
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

  const listClub = await db.club.findMany({
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
      website: true
    }
  })

  const totalClub = await db.club.count({
    where: whereInput
  })

  const userClubs = await db.clubMember.findMany({
    where: {
      userId: locals.user?.id,
      roleId: {
        notIn: [399]
      }
    },
    select: {
      clubId: true,
      roleId: true
    }
  })
  userClubs.forEach(club => {
    if (club.roleId == 306) {
      listPendingClub.push(club.clubId)
    } else {
      listJoinClub.push(club.clubId)
    }
  })

  const pageMeta: iPagination = {
    currentPage: currentPage,
    rowPerPage: takeRow,
    totalRow: totalClub,
    totalPage: Math.ceil(totalClub/takeRow),
  }

	return {
		listClub,
    meta: pageMeta,
    listJoinClub,
    listPendingClub
	}
}