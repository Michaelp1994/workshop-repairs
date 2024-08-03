import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const repairStatusTypes = pgTable("repair_status_types", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  colour: varchar("colour").notNull(),
  ...metadataColumns,
});

export type RepairStatusType = InferModel<typeof repairStatusTypes>;
export type RepairStatusTypeID = RepairStatusType["id"];
export type CreateRepairStatusType = InferCreateModel<typeof repairStatusTypes>;
export type UpdateRepairStatusType = InferUpdateModel<typeof repairStatusTypes>;
export type ArchiveRepairStatusType = InferArchiveModel<
  typeof repairStatusTypes
>;
