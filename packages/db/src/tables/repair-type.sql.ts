import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { laxAuditing, timestamps } from "./columns.helpers";
import { repairTable } from "./repair.sql";

export const repairTypeTable = pgTable(
  "repair_type",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull().unique(),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export const repairTypeRelations = relations(repairTypeTable, ({ many }) => ({
  repairs: many(repairTable),
}));

export type RepairType = InferModel<typeof repairTypeTable>;
export type RepairTypeID = RepairType["id"];
export type CreateRepairType = InferCreateModel<typeof repairTypeTable>;
export type UpdateRepairType = InferUpdateModel<typeof repairTypeTable>;
export type ArchiveRepairType = InferArchiveModel<typeof repairTypeTable>;
