import { error } from '@sveltejs/kit';
import type { iUpdateProfile } from 'interface/user'
import { db } from 'server-service/db';
import { Prisma } from "@prisma/client";

export async function PATCH({request, locals}) {
  try {
    const payload: iUpdateProfile = await request.json()    
    console.log(payload)
    //updating user data
    await db.user.update({
      where: {
        id: locals.user!.id
      },
      data: {
        fullName: payload.fullName,
        nationalityCountryCode: payload.nationalityCountryCode,
        residenceCountryCode: payload.residenceCountryCode,
        address: payload.address,
        district: payload.district,
        dob: payload.dob,
        genderRefId: payload.genderRefId,
        phone: payload.phone,
        phoneCountry: payload.phoneCountry,
      }
    })
    
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
      error(500, e.message)    
    } else {
      error(500, "Internal Server Error")
    }
  }
  return new Response() 
}