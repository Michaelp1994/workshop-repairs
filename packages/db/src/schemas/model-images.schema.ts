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
import { models } from "./models.schema";

export const modelImages = pgTable("model_images", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull(),
  caption: varchar("caption"),
  modelId: integer("model_id")
    .notNull()
    .references((): AnyPgColumn => models.id),
  ...metadataColumns,
});

export type ModelImage = InferModel<typeof modelImages>;
export type ModelImageID = ModelImage["id"];
export type CreateModelImage = InferCreateModel<typeof modelImages>;
export type UpdateModelImage = InferUpdateModel<typeof modelImages>;
export type ArchiveModelImage = InferArchiveModel<typeof modelImages>;
