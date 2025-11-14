import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";

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

export type RepairType = InferModel<typeof repairTypeTable>;
export type RepairTypeID = RepairType["id"];
export type RepairTypeInput = InferInsertModel<typeof repairTypeTable>;
