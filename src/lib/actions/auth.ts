'use server';

import { db } from '@/db/drizzle';
import { type NewUser, userProfile, users } from '@/db/schema';
import { validatedAction } from '@/lib/middleware';
import { comparePasswords, hashPassword, setSession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const signInAction = validatedAction(loginSchema, async (data) => {
  const { username, password } = data;

  // rate limit

  const user = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (user.length === 0) {
    return {
      error: 'Invalid username or password.',
    };
  }

  const { user: foundUser } = user[0];

  const isPasswordValid = await comparePasswords(password, foundUser.password);

  if (!isPasswordValid) {
    return {
      error: 'Invalid username or password.',
    };
  }

  await setSession(foundUser);
});

export async function signOut() {
  const cookieStore = await cookies();
  for (const cookie of cookieStore.getAll()) {
    cookieStore.delete(cookie.name);
  }
}

const registerSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.string().min(1),
});

export const registerAction = validatedAction(registerSchema, async (data) => {
  const { username, password, role } = data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: 'Username already taken. Please try again.' };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    username,
    password: passwordHash,
  };

  const createdUserResult = await db.transaction(async (tx) => {
    const [createdUser] = await tx.insert(users).values(newUser).returning();
    await tx.insert(userProfile).values({
      userId: createdUser.id,
      role: +role,
    });

    return createdUser;
  });

  if (!createdUserResult) {
    return { error: 'Failed to create user. Please try again.' };
  }

  await setSession(createdUserResult);
});
