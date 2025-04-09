import { Pool, neonConfig } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import ws from 'ws';

config({ path: '.env' });

export const db = drizzle(process.env.DATABASE_URL!);

// only do this in Node v21 and below
neonConfig.webSocketConstructor = ws;

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on('error', (err: unknown) => console.error(err)); // deal with e.g. re-connect
