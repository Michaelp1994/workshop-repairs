import { reset } from "drizzle-seed";

import { db } from "../src/index";
import { schema } from "../src/tables";

console.log("resetting database...");
await reset(db, schema);
console.log("database reset.");
