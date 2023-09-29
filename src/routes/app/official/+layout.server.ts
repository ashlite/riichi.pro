import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { db } from "$lib/server/db";

export async function load({ locals }: LayoutServerLoadEvent) {
  if (!locals.user || locals.user.roleId < 102) throw redirect(307, "/")

  const totalPendingClub = await db.club.count({
    where: {
      clubStatusId: 501
    }
  })

  return {
    totalPendingClub
  }
}