import { db } from 'server-service/db.js'


export async function load({params}) {
  const {slug} = params
  const listMember = await db.clubMember.findMany({
    where: {
      roleId: {
        notIn: [399, 306]
      },
      clubData: {
        slug: slug
      }
    },
    include: {
      userData: {
        include: {
          rtData: true
        }
      },
      roleData: true
    },
    orderBy: {
      roleId: 'asc'
    }
  })

  return {
    listMember
  }
}