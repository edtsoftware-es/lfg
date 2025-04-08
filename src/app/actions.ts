'use server';

import { validatedAction } from '@/lib/middleware';
import { setSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const signInAction = validatedAction(loginSchema, async (data) => {
  const { username, password } = data;

  // rate limit

  // buscar si hay user
  // const user= await ....
  const user = { id: 1, name: 'Juan', password: 'hashed' };

  // if (user.length === 0) {
  //   return {
  //     error: 'Invalid username or password.',
  //   };
  // }
  //

  // const { user: foundUser } = user[0];

  // const isPasswordValid = await comparePasswords(password, user.password);

  // if (!isPasswordValid) {
  //   return {
  //     error: 'Invalid username or password.',
  //   };
  // }

  await setSession(user);
});

export async function signOut() {
  const cookieStore = await cookies();
  for (const cookie of cookieStore.getAll()) {
    cookieStore.delete(cookie.name);
  }
}
