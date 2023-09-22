import { firebaseAuth } from "$lib/server/firebaseAdmin";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";

export async function load({ cookies }: LayoutServerLoadEvent) {
  try {
    const token = cookies.get("riichi_pro_token");
    const user = token ? await firebaseAuth.verifyIdToken(token) : null;
    return {
      firebaseId: user?.uid,
    };
  } catch {
    // The token is set but invalid or expired
    cookies.set("riichi_pro_token", "", { maxAge: -1 });
    throw redirect(307, "/");
  }
}