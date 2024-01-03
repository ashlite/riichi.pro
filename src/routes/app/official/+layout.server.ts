import { error } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { db } from "$lib/server/db";

export async function load({ parent }: LayoutServerLoadEvent) {

  const totalPendingClub = await db.club.count({
    where: {
      clubStatusId: 501
    }
  })

  const {user} = await parent()
  if (user && user.roleId < 102) error(403, 'Forbidden to access the resource')

  return {
    totalPendingClub
  }
}