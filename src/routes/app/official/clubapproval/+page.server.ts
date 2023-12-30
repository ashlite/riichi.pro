import { db } from '$lib/server/db.js'

export async function load() {
  const listApproval = await db.club.findMany({
    where: {
      clubStatusId: 501
    },
    include: {
      memberList: {
        where: {
          roleId: 301
        },
        include: {
          userData: {
            select: {
              fullName: true
            }
          }
        }
      }
    }
  })

  return {
    listApproval
  }
}