import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: ["./schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    host: Resource.MyPostgres.host,
    port: Resource.MyPostgres.port,
    user: Resource.MyPostgres.username,
    password: Resource.MyPostgres.password,
    database: Resource.MyPostgres.database,
  },
});
