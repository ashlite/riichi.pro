import type { iMemberAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";

export async function POST({request, cookies, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  try {
    //check cookie
    const decodeToken = await firebaseValidation(cookies)
    
    const payload: iMemberAction = await request.json()
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userData: {
          firebaseId: decodeToken.sub
        },
        clubData: {
          slug: slug
        }
      },
      include: {
        clubData: {
          select: {
            maxAdmin: true
          }
        }
      }
    })

    if (['rejectPending', 'approvePending', 'approveMain', 'rejectMain'].includes(payload.action) && userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canApproveMember)) {
      switch(payload.action) {
        case 'rejectPending': 
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 306
            },
            data: {
              roleId: 399
            }
          })
          break
        case 'approvePending':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 306
            },
            data: {
              roleId: 304
            }
          })

          await db.club.update({
            where: {
              id: userMember.clubId
            },
            data: {
              totalMember: {
                increment: 1
              }
            }
          })
          break
        case 'approveMain':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 305
            },
            data: {
              roleId: 303
            }
          })

          await db.club.update({
            where: {
              id: userMember.clubId
            },
            data: {
              totalMainMember: {
                increment: 1
              }
            }
          })
          break
        case 'rejectMain':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 305
            },
            data: {
              roleId: 304
            }
          })
          break
      }
      response.header.ok = true
    } else if (['transferOwnership'].includes(payload.action) && userMember.roleId == 301 ) {
      //transfer to new Owner
      await db.clubMember.update({
        where: {
          id: payload.targetId,
          roleId: 302,
          clubId: userMember.clubId
        },
        data: {
          roleId: 301
        }
      })

      //revoke owner
      await db.clubMember.update({
        where: {
          id: userMember.id,
          roleId: 301
        }, 
        data: {
          roleId: 302
        }
      })
      
      response.header.ok = true
    } else if (['becomeAdmin', 'kickAdmin', 'kick'].includes(payload.action) && userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canEditAccess)) {
      switch(payload.action) {
        case 'becomeAdmin': {
          //check total admin
          const totalAdmin = await db.clubMember.count({
            where: {
              roleId: 302,
              clubData: {
                slug: slug
              }
            }
          })

          if (totalAdmin >= userMember.clubData.maxAdmin) {
            throw `Maximum total admin is ${userMember.clubData.maxAdmin}`
          }

          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 303,
            },
            data: {
              roleId: 302
            }
          })
          break
        }
        case 'kickAdmin':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 302,
            },
            data: {
              roleId: 303
            }
          })
          break
        case 'kick': {
          const kickedUser = await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: {
                in: [302, 303, 304, 305]
              }
            },
            data: {
              roleId: 399
            }
          })

          //update number
          await db.club.update({
            where: {
              id: userMember.clubId
            },
            data: {
              totalMember: {
                decrement: 1
              },
              totalMainMember: {
                decrement: kickedUser.roleId <= 303 ? 1 : 0
              }
            }
          })
          break
        }
      }
      response.header.ok = true
    } else if (['quit', 'applyMain' ].includes(payload.action) && userMember.roleId > 301) {
      switch(payload.action) {
        case 'quit':
          await db.clubMember.update({
            where: {
              id: userMember.id,
              clubId: userMember.clubId,
              roleId: {
                notIn: [301, 399]
              },
            },
            data: {
              roleId: 399
            }
          })

          //update number
          await db.club.update({
            where: {
              id: userMember.clubId
            },
            data: {
              totalMember: {
                decrement: 1
              },
              totalMainMember: {
                decrement: userMember.roleId <= 303 ? 1 : 0
              }
            }
          })
          break
        case 'applyMain':{
          //check total main member
          const totalMain = await db.clubMember.count({
            where: {
              id: userMember.id,
              roleId: {
                in: [301, 302, 303, 305]
              }
            }
          })
          
          if (totalMain > 0) {
            throw 'You can only apply and become main member to one club'
          }

          await db.clubMember.update({
            where: {
              id: userMember.id,
              roleId: 304
            },
            data: {
              roleId: 305
            }
          })
        }
      }
      response.header.ok = true
    } else {
      response.header.ok = false
      response.header.error = 'Permission error for selected operation'
    }

  } catch (e) {
    response.header.ok = false
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      response.header.error = e.message    
    } else {
      response.header.error = e as string
    }
  }

  return json(response)
}