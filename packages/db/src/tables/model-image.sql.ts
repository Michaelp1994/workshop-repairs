import { relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { auditing, timestamps } from "./columns.helpers";
import { modelTable } from "./model.sql";

export const modelImageTable = pgTable("model_image", {
  id: serial().primaryKey(),
  url: varchar().notNull(),
  caption: varchar(),
  modelId: integer()
    .notNull()
    .references((): AnyPgColumn => modelTable.id),
  ...timestamps,
  ...auditing,
});

export const modelImageRelations = relations(modelImageTable, ({ one }) => ({
  model: one(modelTable, {
    fields: [modelImageTable.modelId],
    references: [modelTable.id],
  }),
}));

export type ModelImage = InferModel<typeof modelImageTable>;
export type ModelImageID = ModelImage["id"];
export type CreateModelImage = InferCreateModel<typeof modelImageTable>;
export type UpdateModelImage = InferUpdateModel<typeof modelImageTable>;
export type ArchiveModelImage = InferArchiveModel<typeof modelImageTable>;
