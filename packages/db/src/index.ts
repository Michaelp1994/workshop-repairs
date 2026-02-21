import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

import { schema } from "./schema";

interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export function createDbConnection({ host, port, user, password, database}: DBConfig) {
const pool = new pg.Pool({
  host,
  port,
  user,
  password,
  database,
  connectionTimeoutMillis: 5000,
});

return drizzle(pool, { schema, casing: "snake_case" });
}

export type Database = NodePgDatabase<typeof schema>;

export type DatabaseTransaction =
  | Parameters<Parameters<Database["transaction"]>[0]>[0]
  | Database;

