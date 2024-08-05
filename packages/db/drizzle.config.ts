import { type Config } from "drizzle-kit";

if (!process.env["POSTGRES_URL"]) {
  throw new Error("POSTGRES_URL is not set");
}

export default {
  schema: "./src/schemas/*.ts",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env["POSTGRES_URL"],
  },
} satisfies Config;
