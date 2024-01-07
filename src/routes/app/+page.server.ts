import { redirect } from '@sveltejs/kit';

export function load() {
  return redirect(303, '/app/profile')
}