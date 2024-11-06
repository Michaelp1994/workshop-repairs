import { sql } from "drizzle-orm";

import { db } from "../src/index";
import { schema } from "../src/schema";

await db.transaction(async (tx) => {
  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);
  for await (const table of Object.values(schema)) {
    await tx.execute(sql`DROP TABLE IF EXISTS ${table} CASCADE;`);
  }
});

console.log("done cleaning");
