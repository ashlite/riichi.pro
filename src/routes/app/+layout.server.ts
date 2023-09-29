import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { firebaseValidation } from "$lib/server/firebaseAdmin";

export async function load({ locals, cookies }: LayoutServerLoadEvent) {
  if (!locals.user) throw redirect(307, "/")
  await firebaseValidation(cookies)
}