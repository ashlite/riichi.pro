import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const ssr = false

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.status == 'register') {
    throw redirect(307, '/register')
  }
}