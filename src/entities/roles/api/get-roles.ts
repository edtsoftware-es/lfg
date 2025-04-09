import { db } from '@/db/drizzle';
import { roles } from '@/db/schema';

export async function getRoles() {
  return await db.select().from(roles);
}
