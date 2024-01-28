import { getUser } from 'server-service/userhook'
import { redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'

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
  } else if (event.url.pathname.startsWith('/api/v1/private')) {
    if (!user) error(403, 'You must login to access cookie')
  }
   
	return await resolve(event);
}