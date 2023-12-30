import type { LayoutServerLoad } from './$types'
import {npm_package_version} from '$env/static/private'

export const ssr = false

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    status: locals.status,
    appVersion: npm_package_version 
  }
}