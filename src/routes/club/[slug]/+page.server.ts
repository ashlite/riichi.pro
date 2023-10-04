import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';
import type { iPagination } from 'interface/pageMeta.js';
import type { Prisma } from '@prisma/client';

export async function load({ url, locals }) {
  if (locals.status == 'register') {
    throw redirect(307, '/register')
  }
}