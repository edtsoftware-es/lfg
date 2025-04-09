import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

// Crear la conexión usando el cliente sql de Vercel Postgres
export const db = drizzle(sql, { schema });
