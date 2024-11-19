import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const repairStatusTypeTable = pgTable("repair_status_type", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  colour: varchar().notNull(),
  ...metadataColumns,
});

export type RepairStatusType = InferModel<typeof repairStatusTypeTable>;
export type RepairStatusTypeID = RepairStatusType["id"];
export type CreateRepairStatusType = InferCreateModel<
  typeof repairStatusTypeTable
>;
export type UpdateRepairStatusType = InferUpdateModel<
  typeof repairStatusTypeTable
>;
export type ArchiveRepairStatusType = InferArchiveModel<
  typeof repairStatusTypeTable
>;
