import { unstable_cache } from './unstable-cache';

import { db } from '@/db/drizzle';
import { groups, roles, userProfile, users } from '@/db/schema';
import { type SQL, eq } from 'drizzle-orm';
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

export const getUserProfile = unstable_cache(
  async (userIdentifier: string | number) => {
    if (!userIdentifier) {
      return null;
    }

    let query: SQL<unknown>;
    if (typeof userIdentifier === 'number') {
      query = eq(userProfile.userId, userIdentifier);
    } else {
      query = eq(userProfile.userName, userIdentifier);
    }

    const profile = await db
      .select({
        userName: userProfile.userName,
        name: userProfile.name,
        bio: userProfile.bio,
        icon: userProfile.icon,
        role: userProfile.role,
        email: userProfile.email,
        location: userProfile.location,
        skills: userProfile.skills,
        linkedin: userProfile.linkdin,
        twitter: userProfile.twitter,
        instagram: userProfile.instagram,
        github: userProfile.github,
      })
      .from(userProfile)
      .where(query)
      .limit(1);

    if (profile.length === 0) {
      return null;
    }

    return profile[0];
  },
  ['profile'],
  {
    revalidate: 60 * 60 * 2,
  }
);

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export const getRoles = unstable_cache(
  () => {
    return db
      .select({
        id: roles.id,
        name: roles.name,
        img: roles.img,
      })
      .from(roles);
  },
  ['roles'],
  {
    revalidate: 60 * 60 * 2,
  }
);

export type Role = Awaited<ReturnType<typeof getRoles>>;

export const getGroups = unstable_cache(
  () => {
    return db.select().from(groups);
  },
  ['groups'],
  {
    revalidate: 60 * 60 * 2,
  }
);
