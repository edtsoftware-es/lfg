import { db, pool } from '@/db/drizzle';
import { type NewUser, userProfile, users } from '@/db/schema';

export async function register(user: NewUser) {
  const client = await pool.connect();

  try {
    const createdUser = await db.insert(users).values(user).returning();
    await db.insert(userProfile).values({
      userId: createdUser[0].id,
    });
  } catch (error) {
    return {
      error: `SignUp error: ${error}`,
    };
  } finally {
    client.release();
  }

  await pool.end();

  return { success: true, error: null };
}
