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
  const resultGender = await prisma.refHelper.createMany({
    data: [{
      id: 401,
      name: 'Male',
      notes: 'Gender identification for user',
      group: 'gender_user'
    },{
      id: 402,
      name: 'Female',
      notes: 'Gender identification for user',
      group: 'gender_user'
    }]
  })

  const resultRt = await prisma.rankTittle.createMany({
    data: [{
      groupRefId: 201,
      name:'Novice',
      skillIndex: 1,
      first: 300,
      second: 100,
      third: 50,
      fourth: 0,
      baseRP: 0,
      promotionRP: 500,
      demotion: false,
      thresholdMP:0,
      clubLimit: 1
    },{
      groupRefId: 202,
      name:'A1',
      skillIndex: 1,
      first: 300,
      second: 100,
      third: 50,
      fourth: 0,
      baseRP: 0,
      promotionRP: 700,
      demotion: false,
      thresholdMP:0,
      clubLimit: 3
    },{
      groupRefId: 202,
      name:'A2',
      skillIndex: 1,
      first: 300,
      second: 100,
      third: 50,
      fourth: 0,
      baseRP: 0,
      promotionRP: 700,
      demotion: false,
      thresholdMP:0,
      clubLimit: 3
    },{
      groupRefId: 202,
      name:'A3',
      skillIndex: 1,
      first: 300,
      second: 100,
      third: 50,
      fourth: 0,
      baseRP: 0,
      promotionRP: 700,
      demotion: false,
      thresholdMP:0,
      clubLimit: 3
    },{
      groupRefId: 202,
      name:'B1',
      skillIndex: 2,
      first: 300,
      second: 100,
      third: 0,
      fourth: -50,
      baseRP: 0,
      promotionRP: 1000,
      demotion: false,
      thresholdMP:0,
      clubLimit: 5
    },{
      groupRefId: 202,
      name:'B2',
      skillIndex: 2,
      first: 300,
      second: 100,
      third: 0,
      fourth: -50,
      baseRP: 0,
      promotionRP: 1000,
      demotion: false,
      thresholdMP:0,
      clubLimit: 5
    },{
      groupRefId: 202,
      name:'B3',
      skillIndex: 2,
      first: 300,
      second: 100,
      third: 0,
      fourth: -50,
      baseRP: 0,
      promotionRP: 1000,
      demotion: false,
      thresholdMP:0,
      clubLimit: 5
    },{
      groupRefId: 202,
      name:'C1',
      skillIndex: 3,
      first: 300,
      second: 100,
      third: -50,
      fourth: -100,
      baseRP: 0,
      promotionRP: 1500,
      demotion: false,
      thresholdMP:0,
      clubLimit: 7
    },{
      groupRefId: 202,
      name:'C2',
      skillIndex: 3,
      first: 300,
      second: 100,
      third: -50,
      fourth: -100,
      baseRP: 0,
      promotionRP: 1500,
      demotion: false,
      thresholdMP:0,
      clubLimit: 7
    },{
      groupRefId: 202,
      name:'C3',
      skillIndex: 3,
      first: 300,
      second: 100,
      third: -50,
      fourth: -100,
      baseRP: 0,
      promotionRP: 1500,
      demotion: false,
      thresholdMP:0,
      clubLimit: 7
    },{
      groupRefId: 203,
      name:'Pro1',
      skillIndex: 4,
      first: 400,
      second: 150,
      third: -100,
      fourth: -200,
      baseRP: 3000,
      promotionRP: 6000,
      demotion: true,
      thresholdMP:100,
      clubLimit: 10
    },{
      groupRefId: 203,
      name:'Pro2',
      skillIndex: 4,
      first: 400,
      second: 150,
      third: -100,
      fourth: -200,
      baseRP: 6000,
      promotionRP: 12000,
      demotion: true,
      thresholdMP:100,
      clubLimit: 13
    },{
      groupRefId: 203,
      name:'Pro3',
      skillIndex: 5,
      first: 400,
      second: 150,
      third: -100,
      fourth: -200,
      baseRP: 9000,
      promotionRP: 18000,
      demotion: true,
      thresholdMP:100,
      clubLimit: 16
    },{
      groupRefId: 203,
      name:'Pro4',
      skillIndex: 5,
      first: 500,
      second: 200,
      third: -100,
      fourth: -200,
      baseRP: 12000,
      promotionRP: 24000,
      demotion: true,
      thresholdMP:100,
      clubLimit: 19
    },{
      groupRefId: 203,
      name:'Pro5',
      skillIndex: 6,
      first: 500,
      second: 200,
      third: -100,
      fourth: -300,
      baseRP: 15000,
      promotionRP: 30000,
      demotion: true,
      thresholdMP:200,
      clubLimit: 22
    },{
      groupRefId: 203,
      name:'Pro6',
      skillIndex: 6,
      first: 500,
      second: 200,
      third: -200,
      fourth: -400,
      baseRP: 18000,
      promotionRP: 36000,
      demotion: true,
      thresholdMP:200,
      clubLimit: 25
    },{
      groupRefId: 203,
      name:'Pro7',
      skillIndex: 7,
      first: 500,
      second: 200,
      third: -200,
      fourth: -500,
      baseRP: 21000,
      promotionRP: 42000,
      demotion: true,
      thresholdMP:200,
      clubLimit: 28
    },{
      groupRefId: 203,
      name:'Pro8',
      skillIndex: 7,
      first: 600,
      second: 300,
      third: -300,
      fourth: -600,
      baseRP: 24000,
      promotionRP: 48000,
      demotion: true,
      thresholdMP:200,
      clubLimit: 31
    },{
      groupRefId: 203,
      name:'Pro9',
      skillIndex: 6,
      first: 600,
      second: 300,
      third: -300,
      fourth: -600,
      baseRP: 27000,
      promotionRP: 0,
      demotion: true,
      thresholdMP:200,
      clubLimit: 35
    }]
  })
  
  console.log({resultUserRoles, resultClubRole, resultRTGroup, resultGender, resultRt})
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