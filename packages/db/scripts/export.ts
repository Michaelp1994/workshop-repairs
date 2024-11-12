import { getTableName } from "drizzle-orm";
import { mkdir, writeFile } from "node:fs/promises";

import { db } from "../src/index";
import { schema } from "../src/schemas";

const outputDir = `./scripts/seeds/${new Date().toISOString().split("T")[0]}`;

await mkdir(outputDir);

for await (const table of Object.values(schema)) {
  const tableName = getTableName(table);
  console.log(`starting ${tableName}...`);
  const query = db.select().from(table);
  const data = await query.execute();
  const dataJson = JSON.stringify(data, null, 2);

  await writeFile(`${outputDir}/${tableName}.json`, dataJson);

  console.log(`finished ${tableName}`);
}
