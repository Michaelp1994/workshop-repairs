import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  schema: "./packages/db/src/tables/*.sql.ts",
  out: "./packages/db/migrations",
  casing: "snake_case",
  dbCredentials: {
    host: Resource.Postgres.host,
    port: Resource.Postgres.port,
    user: Resource.Postgres.username,
    password: Resource.Postgres.password,
    database: Resource.Postgres.database,
    ssl: false,
  },
});
