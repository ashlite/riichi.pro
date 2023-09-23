import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const ssr = false

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(307, '/')
	}
}
