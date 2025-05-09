import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { repairTable } from "./repair.sql";

export const repairImageTable = pgTable(
  "repair_image",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    caption: varchar().notNull(),
    url: varchar().notNull(),
    repairId: integer()
      .notNull()
      .references(() => repairTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export const repairImageRelations = relations(repairImageTable, ({ one }) => ({
  repair: one(repairTable, {
    fields: [repairImageTable.repairId],
    references: [repairTable.id],
  }),
}));

export type RepairImage = InferModel<typeof repairImageTable>;
export type RepairImageID = RepairImage["id"];
export type CreateRepairImage = InferCreateModel<typeof repairImageTable>;
export type UpdateRepairImage = InferUpdateModel<typeof repairImageTable>;
export type ArchiveRepairImage = InferArchiveModel<typeof repairImageTable>;
