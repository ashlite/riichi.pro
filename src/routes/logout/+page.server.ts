import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'

export const actions: Actions = {
  default: async ({cookies, locals}) => {
		cookies.delete('firebase_session', {path: ''})
    locals.firebaseId = undefined
    console.log('logout')
	}
}