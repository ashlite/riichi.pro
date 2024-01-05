import type { LayoutServerLoad } from './$types'
import {npm_package_version} from '$env/static/private'
import type { iUserLocal } from 'interface/user'

export const ssr = false
let loginState: boolean
let loginUser: iUserLocal | undefined = undefined

export const load: LayoutServerLoad = async ({ locals }) => {

  if (locals.user) {
    //login
    loginUser = locals.user
    loginState = true        
  } else {
    //register
    loginUser = undefined
    loginState = false
  }

  return {
    user: loginUser,
    loginState: loginState,
    appVersion: npm_package_version 
  }
}