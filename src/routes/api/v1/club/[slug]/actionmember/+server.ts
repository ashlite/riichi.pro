import type { iMemberAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { error, json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";

export async function POST({request, cookies, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  try {
    if (!locals.user) {
      throw 'You must login to continue'
    }
    //check cookie
    await firebaseValidation(cookies)
    
    const payload: iMemberAction = await request.json()
    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user.id,
        clubData: {
          slug: slug
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
              active: false
            }
          })
          break
        case 'approvePending':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              roleId: 306,
              active: true
            },
            data: {
              roleId: 304,
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
              roleId: 305,
              active: true
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
              roleId: 305,
              active: true
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
        case 'becomeAdmin':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              clubId: userMember.clubId,
              roleId: 303,
            },
            data: {
              roleId: 302
            }
          })
          break
        case 'kickAdmin':
          await db.clubMember.update({
            where: {
              id: payload.targetId,
              clubId: userMember.clubId,
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
              clubId: userMember.clubId,
              active: true,
              roleId: {
                not: 301
              }
            },
            data: {
              active: false
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
              active: true,
            },
            data: {
              active: false
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
        case 'applyMain':
          await db.clubMember.update({
            where: {
              id: userMember.id,
              clubId: userMember.clubId,
              active: true,
              roleId: 304
            },
            data: {
              roleId: 305
            }
          })
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