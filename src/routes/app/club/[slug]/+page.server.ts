import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";
import { db } from "server-service/db";

export async function load({params}) {
  redirect(304, `/app/club/${params.slug}/dashboard`)
}