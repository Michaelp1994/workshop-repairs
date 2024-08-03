import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { repairs } from "./repairs.schema";

export const repairImages = pgTable("repair_images", {
  id: serial("id").primaryKey(),
  caption: varchar("caption").notNull(),
  url: varchar("url").notNull(),
  repairId: integer("repair_id")
    .notNull()
    .references(() => repairs.id),
  ...metadataColumns,
});

export type RepairImage = InferModel<typeof repairImages>;
export type RepairImageID = RepairImage["id"];
export type CreateRepairImage = InferCreateModel<typeof repairImages>;
export type UpdateRepairImage = InferUpdateModel<typeof repairImages>;
export type ArchiveRepairImage = InferArchiveModel<typeof repairImages>;
