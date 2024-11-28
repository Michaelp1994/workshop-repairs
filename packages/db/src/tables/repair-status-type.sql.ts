import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { auditing, timestamps } from "./columns.helpers";
import { repairTable } from "./repair.sql";

export const repairStatusTypeTable = pgTable("repair_status_type", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  colour: varchar().notNull(),
  ...timestamps,
  ...auditing,
});

export const repairStatusTypeRelations = relations(
  repairStatusTypeTable,
  ({ many }) => ({
    repairs: many(repairTable),
  }),
);

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
