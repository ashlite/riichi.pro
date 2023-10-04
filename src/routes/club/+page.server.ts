import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';
import type { iPagination } from 'interface/pageMeta.js';
import type { Prisma } from '@prisma/client';

export async function load({ url, locals }) {
  if (locals.status == 'register') {
    throw redirect(307, '/register')
  }

  // const rtQuery = url.searchParams.get('')
  const currentPage = Number(url.searchParams.get('page') ?? 1)
  const takeRow = Number(url.searchParams.get('take') ?? 10)
  const country = url.searchParams.get('country') ?? 'global'
  const isPlayer = !!locals.user?.playerData
  const listUserClub: string[] = []
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
      emblemPic: true,
      totalMember: true,
      totalMainMember: true,
      countryISO2: true,
      website: true
    }
  })

  const totalClub = await db.club.count({
    where: whereInput
  })

  if (isPlayer) {
    const userClubs = await db.clubMember.findMany({
      where: {
        playerId: locals.user?.playerData?.id,
        active: true
      },
      select: {
        clubId: true,
      }
    })
    userClubs.forEach(club => {
      listUserClub.push(club.clubId)
    })
  } 

  const pageMeta: iPagination = {
    currentPage: currentPage,
    rowPerPage: takeRow,
    totalRow: totalClub,
    totalPage: Math.ceil(totalClub/takeRow),
  }

	return {
		listClub,
    meta: pageMeta,
    isPlayer,
    listUserClub
	}
}