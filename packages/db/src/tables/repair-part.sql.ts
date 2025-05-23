import { relations } from "drizzle-orm";
import { boolean, integer, pgTable } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { partTable } from "./part.sql";
import { repairTable } from "./repair.sql";

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

export const repairPartRelations = relations(repairPartTable, ({ one }) => ({
  repair: one(repairTable, {
    fields: [repairPartTable.repairId],
    references: [repairTable.id],
  }),
  part: one(partTable, {
    fields: [repairPartTable.partId],
    references: [partTable.id],
  }),
}));

export type RepairPart = InferModel<typeof repairPartTable>;
export type RepairPartID = RepairPart["id"];
export type CreateRepairPart = InferCreateModel<typeof repairPartTable>;
export type UpdateRepairPart = InferUpdateModel<typeof repairPartTable>;
export type ArchiveRepairPart = InferArchiveModel<typeof repairPartTable>;
