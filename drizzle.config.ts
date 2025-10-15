import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./packages/db/src/tables/*.sql.ts",
  out: "./packages/db/migrations",
  casing: "snake_case",
  dbCredentials: {
    host: process.env["POSTGRES_HOST"],
    port: Number(process.env["POSTGRES_PORT"]),
    user: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    database: process.env["POSTGRES_DB"],
    ssl: false,
  },
});
