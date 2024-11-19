import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { Resource } from "sst";

import { schema } from "./tables";

const pool = new pg.Pool({
  host: Resource.Postgres1.host,
  port: Resource.Postgres1.port,
  user: Resource.Postgres1.username,
  password: Resource.Postgres1.password,
  database: Resource.Postgres1.database,
});

export const db = drizzle(pool, { schema, casing: "snake_case" });

export type Database = typeof db;
