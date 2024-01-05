import { getUser } from '$lib/server/userhook'
import { redirect } from '@sveltejs/kit'


export async function handle({event, resolve}) {
  
  const user = await getUser(event.cookies)
  event.locals.user = user

  if (event.url.pathname.startsWith('/app')) {
    if (!user) redirect(303, '/')
    else {
      if (event.url.pathname.startsWith('/app/official') && user.roleId < 102) {
        redirect(303, '/')
      }else if (event.url.pathname.startsWith('/app/administrator') && user.roleId < 103) {
        redirect(303, '/')
      }
    }
  }
   
	return await resolve(event);
}