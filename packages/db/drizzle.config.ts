import { defineConfig } from "drizzle-kit";

if (
  !process.env["POSTGRES_HOST"] ||
  !process.env["POSTGRES_PORT"] ||
  !process.env["POSTGRES_USER"] ||
  !process.env["POSTGRES_PASSWORD"] ||
  !process.env["POSTGRES_DB"]
) {
  throw Error("env vars not working for drizzle");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/tables/*.sql.ts",
  out: "./migrations",
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
