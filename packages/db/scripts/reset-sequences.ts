import { getTableColumns, sql } from "drizzle-orm";
import { getTableName } from "drizzle-orm";

import { db } from "../src/index";
import { schema } from "../src/schema";

await db.transaction(async (tx) => {
  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);
  for await (const table of Object.values(schema)) {
    const tableName = getTableName(table);
    const columns = getTableColumns(table);
    if ("id" in columns) {
      await tx.execute(
        sql`SELECT pg_catalog.setval(pg_get_serial_sequence('${table}', 'id'), MAX(id)) FROM ${table};`,
      );
      console.log(`reset ${tableName}`);
    } else {
      console.log(`skipped ${tableName}`);
    }
  }
  console.log("done.");
});
