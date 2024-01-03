import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { firebaseValidation } from "$lib/server/firebaseAdmin";
import { error } from "@sveltejs/kit";

export async function load({ locals, cookies, parent }: LayoutServerLoadEvent) {
  if (!locals.firebaseId) redirect(307, "/")
  await firebaseValidation(cookies)

  const {loginState} = await parent()
  if (loginState == 'register') {
    redirect(307, '/register');
  } else if (loginState == 'logout') {
    error(403, 'Please login first to access the app')
  }
}