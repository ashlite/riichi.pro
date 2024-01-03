import type { LayoutServerLoad } from './$types'
import {npm_package_version} from '$env/static/private'
import { firebaseValidation } from '$lib/server/firebaseAdmin'
import { db } from '$lib/server/db'
import type { iUserLocal } from 'interface/user'
import { error } from '@sveltejs/kit'

export const ssr = false
let loginState: 'login' | 'register' | 'logout' = 'logout'
let loginUser: iUserLocal | undefined = undefined

export const load: LayoutServerLoad = async ({ locals, cookies }) => {

  //check locals and cookies
  if (locals.firebaseId) {
    try {
      const decodeToken = await firebaseValidation(cookies)
      const userData = await db.user.findFirst({
        where: {
          firebaseId: decodeToken.sub
        },
        include: {
          clubList: true,
          rtData: true
        }
      })

      if (userData) {
        //login
        loginUser = userData
        loginState = 'login'        
      } else {
        //register
        loginUser = undefined
        loginState = 'register'
      }
    } catch (e) {
      cookies.delete('janshi_token', {path: '/'})
      error(401, 'Cookie validation error')
    }
  }

  return {
    user: loginUser,
    loginState: loginState,
    appVersion: npm_package_version 
  }
}