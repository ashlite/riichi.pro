import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'

export const actions: Actions = {
  default: async ({cookies, locals}) => {
		cookies.delete('firebase_session')
    locals.user = undefined
    console.log('logout')
	}
}