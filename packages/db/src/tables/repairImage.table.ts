import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { repairTable } from "./repair.table";

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
export type RepairImageInput = InferInsertModel<typeof repairImageTable>;
