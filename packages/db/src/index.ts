import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { Resource } from "sst";

import { schema } from "./tables";

const pool = new pg.Pool({
  host: Resource.Postgres.host,
  port: Resource.Postgres.port,
  user: Resource.Postgres.username,
  password: Resource.Postgres.password,
  database: Resource.Postgres.database,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema, casing: "snake_case" });

export type Database = typeof db;
