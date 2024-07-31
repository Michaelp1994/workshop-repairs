import { type Config } from "drizzle-kit";

if (!process.env["DATABASE_URL"]) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./src/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"],
  },
} satisfies Config;
