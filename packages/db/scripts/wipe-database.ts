import { reset } from "drizzle-seed";

import { db } from "../src/index";
import { schema } from "../src/tables";

async function main() {
  console.log("wiping database...");
  await reset(db, schema);
  console.log("db wiped.");
}

main();
