import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { repairTable } from "./repair.table";

export const repairStatusTypeTable = pgTable(
  "repair_status_type",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull().unique(),
    colour: varchar().notNull(),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export const repairStatusTypeRelations = relations(
  repairStatusTypeTable,
  ({ many }) => ({
    repairs: many(repairTable),
  }),
);

export type RepairStatusType = InferModel<typeof repairStatusTypeTable>;
export type RepairStatusTypeID = RepairStatusType["id"];
export type RepairStatusTypeInput = InferInsertModel<
  typeof repairStatusTypeTable
>;
