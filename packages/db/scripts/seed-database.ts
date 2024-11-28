import { reset, seed } from "drizzle-seed";

import { db } from "../src/index";
import { schema } from "../src/tables";

// TODO: these tables don't work for now as model and modelImage are cyclically dependent
// https://github.com/drizzle-team/drizzle-orm/issues/3635

const {
  assetTable,
  modelImageTable,
  modelTable,
  partsToModelTable,
  repairCommentTable,
  repairImageTable,
  repairPartTable,
  repairTable,
  userOnboardingTable,
  ...selectedSchema
} = schema;

console.log("resetting database...");
await reset(db, selectedSchema);
console.log("db reset.");

console.log("seeding database...");
await seed(db, selectedSchema);
console.log("db seeded.");

process.exit();
