import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const resultUserRoles = await prisma.refHelper.createMany({
    data: [{
      id: 101,
      name: 'Normal',
      notes: 'Roles for user basic',
      group: 'user-roles'
    },{
      id: 102,
      name: 'Official',
      notes: 'Roles for user official',
      group: 'user-roles'
    },{
      id: 103,
      name: 'Developer',
      notes: 'Roles for app developer',
      group: 'user-roles'
    }]
  })
  const resultRTGroup = await prisma.refHelper.createMany({
    data: [{
      id: 201,
      name: 'Novice',
      notes: 'Rank title group',
      group: 'rt-group'
    },{
      id: 202,
      name: 'Amateur',
      notes: 'Rank title group for A1-C3',
      group: 'rt-group'
    },{
      id: 203,
      name: 'Profesional',
      notes: 'Rank title group for Pro1-Pro9',
      group: 'rt-group'
    },{
      id: 204,
      name: 'Master',
      notes: 'Rank title group for master',
      group: 'rt-group'
    }]
  })
  const resultClubRole = await prisma.refHelper.createMany({
    data: [{
      id: 301,
      name: 'Owner',
      notes: 'Club owner, have admin and main member full privilage',
      group: 'club-roles'
    },{
      id: 302,
      name: 'Admin',
      notes: 'Club admin, have main member and admin that have individual privilage',
      group: 'club-roles'
    },{
      id: 303,
      name: 'Main',
      notes: 'Club main member, have main member privilage',
      group: 'club-roles'
    },{
      id: 304,
      name: 'Basic',
      notes: 'Club basic member, have basic privilage',
      group: 'club-roles'
    },{
      id: 305,
      name: 'Guest',
      notes: 'Club guest member, have guest privilage but with expiration date',
      group: 'club-roles'
    }]
  })
  
  console.log({resultUserRoles, resultClubRole, resultRTGroup})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })