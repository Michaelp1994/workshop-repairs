import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { modelTable } from "./model.sql";
import { partTable } from "./part.sql";

export const partToModelTable = pgTable(
  "part_to_model",
  {
    quantity: integer().notNull(),
    partId: integer()
      .notNull()
      .references(() => partTable.id),
    modelId: integer()
      .notNull()
      .references(() => modelTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    primaryKey({ columns: [t.partId, t.modelId] }),
    ...auditConstraints(t),
  ],
);

export const partToModelRelations = relations(partToModelTable, ({ one }) => ({
  part: one(partTable, {
    fields: [partToModelTable.partId],
    references: [partTable.id],
  }),
  model: one(modelTable, {
    fields: [partToModelTable.modelId],
    references: [modelTable.id],
  }),
}));

export type PartToModel = InferModel<typeof partToModelTable>;
export type PartToModelInput = InferInsertModel<typeof partToModelTable>;
