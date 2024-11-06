import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/*.ts",
  out: "./migrations",
  dbCredentials: {
    host: Resource.Postgres1.host,
    port: Resource.Postgres1.port,
    user: Resource.Postgres1.username,
    password: Resource.Postgres1.password,
    database: Resource.Postgres1.database,
  },
});
