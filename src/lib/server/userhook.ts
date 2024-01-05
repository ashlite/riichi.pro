import type { Cookies } from "@sveltejs/kit"
import { cookieValidation } from "./firebaseAdmin"
import { db } from "./db"
import type { iUserLocal } from "interface/user"

export async function getUser(cookie: Cookies): Promise<iUserLocal|null> {
  const token = await cookieValidation(cookie)
  if (token) {
    const user = await db.user.findFirst({
      where: {
        id: token.sub
      }, 
      select: {
        id: true,
        seqId: true,
        fullName: true,
        email: true,
        nationalityCountryCode: true,
        residenceCountryCode: true,
        genderRefId: true,
        rtId: true,
        banStatus: true,
        banExpiration: true,
        roleId: true,
        bioValid: true
      }
    })
  
    return user
  } else {
    return null
  }
}