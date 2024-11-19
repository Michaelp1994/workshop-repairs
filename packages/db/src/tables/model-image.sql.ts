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
import metadataColumns from "./metadata-columns";
import { modelTable } from "./model.sql";

export const modelImageTable = pgTable("model_image", {
  id: serial().primaryKey(),
  url: varchar().notNull(),
  caption: varchar(),
  modelId: integer()
    .notNull()
    .references((): AnyPgColumn => modelTable.id),
  ...metadataColumns,
});

export type ModelImage = InferModel<typeof modelImageTable>;
export type ModelImageID = ModelImage["id"];
export type CreateModelImage = InferCreateModel<typeof modelImageTable>;
export type UpdateModelImage = InferUpdateModel<typeof modelImageTable>;
export type ArchiveModelImage = InferArchiveModel<typeof modelImageTable>;
