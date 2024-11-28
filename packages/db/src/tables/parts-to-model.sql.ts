import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { modelTable } from "./model.sql";
import { partTable } from "./part.sql";

export const partsToModelTable = pgTable(
  "parts_to_model",
  {
    quantity: integer().notNull(),
    partId: integer()
      .notNull()
      .references(() => partTable.id),
    modelId: integer()
      .notNull()
      .references(() => modelTable.id),
  },
  (t) => [primaryKey({ columns: [t.partId, t.modelId] })],
);

export const partsToModelRelations = relations(
  partsToModelTable,
  ({ one }) => ({
    part: one(partTable, {
      fields: [partsToModelTable.partId],
      references: [partTable.id],
    }),
    model: one(modelTable, {
      fields: [partsToModelTable.modelId],
      references: [modelTable.id],
    }),
  }),
);

export type PartToModel = typeof partsToModelTable.$inferSelect;
export type CreatePartToModel = typeof partsToModelTable.$inferInsert;
export type UpdatePartToModel = CreatePartToModel;
export type ArchivePartToModel = Omit<CreatePartToModel, "quantity">;
