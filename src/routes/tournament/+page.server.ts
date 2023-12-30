import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const ssr = false

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.status == 'register') {
    redirect(307, '/register');
  }
}