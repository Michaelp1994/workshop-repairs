import type { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

import { schema } from "./tables";

const pool = new pg.Pool({
  host: process.env["POSTGRES_HOST"],
  port: Number(process.env["POSTGRES_PORT"]),
  user: process.env["POSTGRES_USER"],
  password: process.env["POSTGRES_PASSWORD"],
  database: process.env["POSTGRES_DB"],
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema, casing: "snake_case" });

export type Database = NodePgDatabase<typeof schema>;

export type DatabaseTransaction =
  | Parameters<Parameters<Database["transaction"]>[0]>[0]
  | Database;

export type Table<T extends TableConfig> = PgTableWithColumns<T>;
