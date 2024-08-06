import { getTableName } from "drizzle-orm";
import { writeFile } from "node:fs/promises";

import { db } from "../src/index";
import { schema } from "../src/schema";

const outputDir = "./seeds";

for await (const table of Object.values(schema)) {
  const tableName = getTableName(table);
  console.log({ tableName });
  const query = db.select().from(table);
  const data = await query.execute();
  const dataJson = JSON.stringify(data, null, 2);

  await writeFile(`./${outputDir}/${tableName}.json`, dataJson);
}
