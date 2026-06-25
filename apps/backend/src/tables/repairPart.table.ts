import { type InferInsertModel } from "drizzle-orm";
import { boolean, integer, pgTable } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { partTable } from "./part.table";
import { repairTable } from "./repair.table";

export const repairPartTable = pgTable(
  "repair_part",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: integer().notNull(),
    installed: boolean("installed").notNull().default(false),
    repairId: integer()
      .notNull()
      .references(() => repairTable.id),
    partId: integer()
      .notNull()
      .references(() => partTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export type RepairPart = InferModel<typeof repairPartTable>;
export type RepairPartID = RepairPart["id"];
export type RepairPartInput = InferInsertModel<typeof repairPartTable>;
