import {
  type AnyPgColumn,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { models } from "./models.schema";
import { users } from "./users.schema";

export const modelImages = pgTable("model_images", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull(),
  caption: varchar("caption"),
  modelId: integer("model_id")
    .notNull()
    .references((): AnyPgColumn => models.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type ModelImage = InferModel<typeof modelImages>;
export type ModelImageID = ModelImage["id"];
export type CreateModelImage = InferCreateModel<typeof modelImages>;
export type UpdateModelImage = InferUpdateModel<typeof modelImages>;
export type DeleteModelImage = InferDeleteModel<typeof modelImages>;
