import { unstable_cache } from './unstable-cache';

import { db } from '@/db/drizzle';
import { roles } from '@/db/schema';

export const getRoles = unstable_cache(
  () => {
    return db.select().from(roles);
  },
  ['roles'],
  {
    revalidate: 60 * 60 * 2,
  }
);
