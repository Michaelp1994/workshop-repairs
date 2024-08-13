import { sql } from "@vercel/postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {
  drizzle as vercelDrizzle,
  type VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import postgres from "postgres";

import { schema } from "./schema";

if (!process.env["POSTGRES_URL"]) {
  throw Error("ensure env variables are set up (POSTGRES_URL, NODE_ENV)");
}

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(process.env["POSTGRES_URL"]);
if (process.env["NODE_ENV"] !== "production") globalForDb.conn = conn;

let db: PostgresJsDatabase<typeof schema> | VercelPgDatabase<typeof schema>;
if (process.env["NODE_ENV"] === "production") {
  db = vercelDrizzle(sql, { schema });
} else {
  db = drizzle(conn, { schema });
}

export { db };

// export const db = drizzle(conn, { schema });

export type Database = typeof db;
