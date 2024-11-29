import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "../src";

export async function handler() {
  await migrate(db, {
    migrationsFolder: "./migrations",
  });
  return "Database migrated successfully!";
}
