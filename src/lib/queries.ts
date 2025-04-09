import { unstable_cache } from './unstable-cache';

import { db } from '@/db/drizzle';
import { roles, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { verifyToken } from './session';

export async function getUser() {
  const session = (await cookies()).get('session');
  if (!session || !session.value) {
    return null;
  }

  const sessionData = await verifyToken(session.value);

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionData.user.id))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export const getRoles = unstable_cache(
  () => {
    return db.select().from(roles);
  },
  ['roles'],
  {
    revalidate: 60 * 60 * 2,
  }
);
