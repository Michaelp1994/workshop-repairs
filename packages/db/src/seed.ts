import { reset } from "drizzle-seed";

import asset_statuses from "../seed/asset_statuses.json";
import repair_status_types from "../seed/repair_status_types.json";
import repair_types from "../seed/repair_types.json";
import user_types from "../seed/user_types.json";
import { db } from "./index";
import { schema } from "./tables";
import { assetStatusTable } from "./tables/asset-status.sql";
import { repairStatusTypeTable } from "./tables/repair-status-type.sql";
import { repairTypeTable } from "./tables/repair-type.sql";
import { userTypeTable } from "./tables/user-type.sql";

export async function handler() {
  console.log("Seeding database...");
  try {
    await reset(db, schema);
    await db.transaction(async (t) => {
      await t.insert(assetStatusTable).values(asset_statuses);
      await t.insert(repairStatusTypeTable).values(repair_status_types);
      await t.insert(repairTypeTable).values(repair_types);
      await t.insert(userTypeTable).values(user_types);
      console.log("Database seeded successfully!");
    });
    return "Database seeded successfully.";
  } catch (e) {
    console.error("Failed to seed database.");
    console.log(e);
    return "Failed to seed database.";
  }
}
