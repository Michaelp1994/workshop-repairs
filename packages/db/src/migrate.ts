import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "../src";

export async function handler() {
  try {
    await migrate(db, {
      migrationsFolder: "./migrations",
    });
    return "Database migrated successfully!";
  } catch (e) {
    console.error(e);
    return "Failed to migrate database.";
  }
}
