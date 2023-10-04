import { error } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const ssr = false

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    status: locals.status 
  }
}