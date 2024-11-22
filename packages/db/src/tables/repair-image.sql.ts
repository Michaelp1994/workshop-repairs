import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { repairTable } from "./repair.sql";

export const repairImageTable = pgTable("repair_image", {
  id: serial().primaryKey(),
  caption: varchar().notNull(),
  url: varchar().notNull(),
  repairId: integer()
    .notNull()
    .references(() => repairTable.id),
  ...metadataColumns,
});

export type RepairImage = InferModel<typeof repairImageTable>;
export type RepairImageID = RepairImage["id"];
export type CreateRepairImage = InferCreateModel<typeof repairImageTable>;
export type UpdateRepairImage = InferUpdateModel<typeof repairImageTable>;
export type ArchiveRepairImage = InferArchiveModel<typeof repairImageTable>;
