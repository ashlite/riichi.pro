import { redirect } from "@sveltejs/kit";
import { db } from "server-service/db";

export async function load({url}) {

  const totalPendingClub = await db.club.count({
    where: {
      clubStatusId: {
        in: [501, 599]
      }
    }
  })
  if (url.pathname == '/app/official') redirect(303,'/app/official/dashboard')

  return {
    totalPendingClub
  }
}