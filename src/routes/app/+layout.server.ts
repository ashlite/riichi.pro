import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { firebaseValidation } from "$lib/server/firebaseAdmin";

export async function load({ locals, cookies }: LayoutServerLoadEvent) {
  if (!locals.user) throw redirect(307, "/")
  if (locals.status == 'register') {
    throw redirect(307, '/register')
  }
  await firebaseValidation(cookies)
}