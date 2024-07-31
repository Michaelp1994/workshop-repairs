import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schema } from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

if (!process.env["DATABASE_URL"]) {
  throw Error("ensure env variables are set up (DATABASE_URL, NODE_ENV)");
}

const conn = globalForDb.conn ?? postgres(process.env["DATABASE_URL"]);
if (process.env["NODE_ENV"] !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

export type Database = typeof db;
