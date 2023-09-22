import { db } from '$lib/server/db.js';

export async function load({ params }) {
  const players = await db.player.findMany({
    orderBy: {
      rtData: {
        id: 'desc'
      },
      currentRP:'desc',
      currentMP:'desc',
      id: 'desc'
    },
    take: 50,
    skip: 0
  })
	return {
		data: players
	};
}