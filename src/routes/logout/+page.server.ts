import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'

export const actions: Actions = {
  default: async ({cookies, locals}) => {
		cookies.delete('janshi_token', {path: '/'})
    locals.user = null
    return redirect(303, '/')
	}
}