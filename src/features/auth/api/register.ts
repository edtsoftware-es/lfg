import { db } from '@/db/drizzle';
import { type NewUser, userProfile, users } from '@/db/schema';

export async function register(user: NewUser) {
  try {
    await db.transaction(async (tx) => {
      const createdUser = await tx.insert(users).values(user).returning();
      console.log({ createdUser });
      await tx.insert(userProfile).values({
        userId: createdUser[0].id,
      });
    });
  } catch (error: unknown) {
    return {
      error: `SignUp error: ${error}`,
    };
  }
  return {
    success: true,
    error: null,
  };
}
