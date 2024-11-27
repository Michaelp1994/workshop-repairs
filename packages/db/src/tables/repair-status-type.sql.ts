import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { auditing, timestamps } from "./columns.helpers";

export const repairStatusTypeTable = pgTable("repair_status_type", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  colour: varchar().notNull(),
  ...timestamps,
  ...auditing,
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
