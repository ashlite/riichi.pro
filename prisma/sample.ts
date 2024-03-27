import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const clubId = 'f1089749-8afd-4ab4-9510-18738fb969e7'
  const userInput: Prisma.UserCreateInput[] = [{
    id: 'test1',
    fullName: 'test 1',
    email: 'test-1@mail.com',
    nationalityCountryCode: 'NA',
    residenceCountryCode: 'NA',
    address: 'unknown',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  },{
    fullName: 'test 2',
    email: 'test-2@mail.com',
    nationalityCountryCode: 'ID',
    residenceCountryCode: 'ID',
    address: 'unknown',
    id: 'test2',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  },{
    fullName: 'test 3',
    email: 'test-3@mail.com',
    nationalityCountryCode: 'ID',
    residenceCountryCode: 'ID',
    address: 'unknown',
    id: 'test3',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  },{
    fullName: 'test 4',
    email: 'test-4@mail.com',
    nationalityCountryCode: 'JP',
    residenceCountryCode: 'JP',
    address: 'unknown',
    id: 'test4',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  },{
    fullName: 'test 5',
    email: 'test-5@mail.com',
    nationalityCountryCode: 'ID',
    residenceCountryCode: 'ID',
    address: 'unknown',
    id: 'test5',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  },{
    fullName: 'test 6',
    email: 'test-6@mail.com',
    nationalityCountryCode: 'ID',
    residenceCountryCode: 'ID',
    address: 'unknown',
    id: 'test6',
    metaData: {
      create: {}
    },
    clubList: {
      create: {
        clubId: clubId,
        roleId: 306,
      }
    }
  }]

  await Promise.all(
    userInput.map(async (user) => {
      await prisma.user.create({
        data: user,
      })
    })
  )

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