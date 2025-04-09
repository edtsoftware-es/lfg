'use server';

import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { validatedAction } from '@/lib/middleware';
import { comparePasswords, setSession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { register } from '../api/register';

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
  role: z.string(),
});

export const registerAction = validatedAction(registerSchema, async (data) => {
  await register(data);
});
