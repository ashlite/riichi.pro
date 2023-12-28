import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'

export const actions: Actions = {
  default: async ({cookies, locals}) => {
		/* @migration task: add path argument */ cookies.delete('firebase_session')
    locals.user = undefined
    console.log('logout')
	}
}