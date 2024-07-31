import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { models } from "./models.schema";
import { parts } from "./parts.schema";

export const partsToModels = pgTable(
  "parts_to_models",
  {
    quantity: integer("quantity").notNull(),
    partId: integer("part_id")
      .notNull()
      .references(() => parts.id),
    modelId: integer("model_id")
      .notNull()
      .references(() => models.id),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.partId, t.modelId] }),
    };
  },
);

export type PartToModel = typeof partsToModels.$inferSelect;
export type CreatePartToModel = typeof partsToModels.$inferInsert;
export type UpdatePartToModel = CreatePartToModel;
export type DeletePartToModel = Omit<CreatePartToModel, "quantity">;
