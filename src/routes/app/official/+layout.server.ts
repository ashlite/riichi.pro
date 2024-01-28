import { redirect } from "@sveltejs/kit";
import { db } from "server-service/db";

export async function load({url}) {

  const totalPendingClub = await db.club.count({
    where: {
      clubStatusId: 501
    }
  })
  if (url.pathname == '/app/official') redirect(303,'/app/official/dashboard')

  return {
    totalPendingClub
  }
}