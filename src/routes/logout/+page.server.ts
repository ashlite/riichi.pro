import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = (async ({locals, cookies}) => {
  await cookies.delete('firebase_session')
  locals.user = undefined
  throw error(401, 'User Signout')
})