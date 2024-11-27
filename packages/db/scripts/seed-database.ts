import { seed } from "drizzle-seed";

import { db } from "../src/index";
import { schema } from "../src/tables";

console.log("seeding database...");
await seed(db, schema);
console.log("db seeded.");
