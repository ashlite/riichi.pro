import { db } from 'server-service/db.js'

export async function load() {
  const listApproval = await db.club.findMany({
    where: {
      clubStatusId: {
        in: [501, 599]
      }
    },
    include: {
      memberList: {
        where: {
          roleId: 301
        },
        include: {
          userData: {
            select: {
              fullName: true,
              id: true,
              avatarUrl: true,
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