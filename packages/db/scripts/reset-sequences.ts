import { sql } from "drizzle-orm";
import { getTableName } from "drizzle-orm";

import { db } from "../src/index";
import { schema } from "../src/schema";

const tables = [
  schema.assets,
  schema.assetStatuses,
  schema.clients,
  schema.locations,
  schema.manufacturers,
  schema.models,
  schema.parts,
  //   schema.partsToModels,
  schema.repairComments,
  //   schema.repairImages,
  schema.repairParts,
  schema.repairs,
  schema.repairStatusTypes,
  schema.repairTypes,
  schema.users,
  schema.userTypes,
];

await db.transaction(async (tx) => {
  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);
  for await (const table of tables) {
    const tableName = getTableName(table);
    console.log(`resetting ${tableName}`);
    await tx.execute(
      sql`SELECT pg_catalog.setval(pg_get_serial_sequence('${table}', 'id'), MAX(id)) FROM ${table};`,
    );
    // console.log("max id: ", maxId[0].max);

    // await tx.execute(
    //   sql`SELECT setval(pg_get_serial_sequence('${table}', 'id'), max(id)) FROM ${table};`,
    // );
  }
});
