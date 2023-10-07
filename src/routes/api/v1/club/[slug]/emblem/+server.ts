import type { iMemberAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils.js";
import { Prisma } from "@prisma/client";
import { error, json } from "@sveltejs/kit";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { db } from "$lib/server/db.js";
import { uploadImage, deleteImage } from "service/s3.js";
import { env } from '$env/dynamic/public'

export async function POST({request, cookies, locals, params}) {
  const response = {header:{}, data:{}} as iGlobalResponse
  const { slug } = params
  const allowedExtension =  /(\.jpg|\.jpeg|\.png|\.gif)$/i
  try {
    if (!locals.user) {
      throw 'You must login to continue'
    }
    //check cookie
    await firebaseValidation(cookies)

    //check image
    const payload = await request.formData()
    const imageFile = payload.get('image') as File
    if (!imageFile) {
      throw 'File data not supplied'
    } else if (imageFile.size > 5000000) {
      throw 'Maximum file size is 5mb'
    } else if (!allowedExtension.exec(imageFile.name)) {
      throw 'Only accept jpg, jpeg, png, gif type files'
    }

    const userMember = await db.clubMember.findFirstOrThrow({
      where: {
        userId: locals.user.id,
        clubData: {
          slug: slug
        }
      },
      select: {
        roleId: true,
        canEditClubInfo: true,
        clubData: {
          select: {
            id: true,
            emblemFile: true
          }
        }
      }
    })

    if (userMember.roleId <= 302 || (userMember.roleId == 302 && userMember.canEditClubInfo)) {
      //delete previous file if any
      if (userMember.clubData.emblemFile) {
        const deleteResult = await deleteImage(env.PUBLIC_TEBI_BUCKET_CLUB_EMBLEM, userMember.clubData.emblemFile)
        if (!deleteResult) {
          throw 'Failed to remove old data, please contact developer'
        }
      }

      const fileBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(fileBuffer)
      const nameSplit = imageFile.name.split('.')
      const fileFormat = nameSplit[nameSplit.length - 1]
      const result = await uploadImage(env.PUBLIC_TEBI_BUCKET_CLUB_EMBLEM, userMember.clubData.id.toString(), buffer, fileFormat)
      if (result) {
        await db.club.update({
          where: {
            id: userMember.clubData.id
          },
          data: {
            emblemFile: result
          }
        })
        response.header.ok = true
      } else {
        response.header.ok = false
        response.header.error = 'Failed to upload to image server'
      }
    } else {
      response.header.ok = false
      response.header.error = "You dont have enough permission"
    }

  } catch (e) {
    console.log(e)
    response.header.ok = false
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      response.header.error = e.message    
    } else {
      response.header.error = (e as any).code
    }
  }

  return json(response)
}