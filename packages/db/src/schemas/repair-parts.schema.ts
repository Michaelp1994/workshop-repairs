import { boolean, integer, pgTable, serial } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { parts } from "./parts.schema";
import { repairs } from "./repairs.schema";

export const repairParts = pgTable("repair_parts", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  installed: boolean("installed").notNull().default(false),
  repairId: integer("repair_id")
    .notNull()
    .references(() => repairs.id),
  partId: integer("part_id")
    .notNull()
    .references(() => parts.id),
  ...metadataColumns,
});

export type RepairPart = InferModel<typeof repairParts>;
export type RepairPartID = RepairPart["id"];
export type CreateRepairPart = InferCreateModel<typeof repairParts>;
export type UpdateRepairPart = InferUpdateModel<typeof repairParts>;
export type ArchiveRepairPart = InferArchiveModel<typeof repairParts>;
