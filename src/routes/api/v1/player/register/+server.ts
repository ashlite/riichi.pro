// import { error, json } from '@sveltejs/kit';
// import type { iRegisterData } from 'interface/user';
// import { firebaseAuth } from '$lib/server/firebaseAdmin';
// import { db } from '$lib/server/db';
// import { firebaseValidation } from '$lib/server/firebaseAdmin';
// import type { iGlobalResponse } from 'interface/utils.js';
// import { Prisma } from "@prisma/client";

// export async function POST({request, cookies}) {
//   const response = {header:{}, data:{}} as iGlobalResponse
//   try {
//     const decodedIdToken = await firebaseValidation(cookies)
//     const payload: iRegisterData = await request.json()
    
//     //creating user data
//     const user = await db.user.create({
//       data: {
//         email: decodedIdToken.email!,
//         firebaseId: decodedIdToken.uid,
//         fullName: payload.fullName,
//         nationalityCountryCode: payload.nationalityCountryCode,
//         residenceCountryCode: payload.residenceCountryCode,
//         address: payload.address,
//         district: payload.district,
//         dob: payload.dob,
//         genderRefId: payload.genderRefId,
//         phone: payload.phone,
//         phoneCountry: payload.phoneCountry,
//         realId: payload.realId,
//         sourceRealId: payload.sourceRealId,
//         telegramId: payload.telegramId,
//         metaData: {
//           create: {}
//         }
//       }
//     })
    
//     response.header.ok = true
//     response.data.id = user.id
//   } catch (e) {
//     response.header.ok = false
//     if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientKnownRequestError || e instanceof Prisma.PrismaClientValidationError) {
//       response.header.error = e.message    
//     } else {
//       response.header.error = e as string
//     }
//   }
//   return json(response)
  
// }