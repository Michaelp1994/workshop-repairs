import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { laxAuditing, timestamps } from "./columns.helpers";
import { repairTable } from "./repair.table";

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
export type RepairTypeInput = InferInsertModel<typeof repairTypeTable>;
