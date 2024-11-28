import asset_statuses from "../seed/asset_statuses.json";
import repair_status_types from "../seed/repair_status_types.json";
import repair_types from "../seed/repair_types.json";
import user_types from "../seed/user_types.json";
import { db } from "../src/index";
import { assetStatusTable } from "../src/tables/asset-status.sql";
import { repairStatusTypeTable } from "../src/tables/repair-status-type.sql";
import { repairTypeTable } from "../src/tables/repair-type.sql";
import { userTypeTable } from "../src/tables/user-type.sql";

console.log("Seeding database...");

try {
  await db.transaction(async (t) => {
    await t.insert(assetStatusTable).values(asset_statuses);
    await t.insert(repairStatusTypeTable).values(repair_status_types);
    await t.insert(repairTypeTable).values(repair_types);
    await t.insert(userTypeTable).values(user_types);
    console.log("Database seeded successfully!");
  });
} catch (e) {
  console.error("Failed to seed database!");
  console.log(e);
  process.exit(1);
}
