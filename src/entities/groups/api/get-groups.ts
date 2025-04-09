import { db } from '@/db/drizzle';
import { groups } from '@/db/schema';

export async function getGroups() {
  return await db.select().from(groups);
}
