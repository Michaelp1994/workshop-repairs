import {
  foreignKey,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { manufacturers } from "./manufacturers.schema";
import { modelImages } from "./model-images.schema";
import { users } from "./users.schema";

export const models = pgTable(
  "models",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull().unique(),
    nickname: varchar("nickname").notNull().unique(),
    manufacturerId: integer("manufacturer_id")
      .notNull()
      .references(() => manufacturers.id),
    defaultImageId: integer("default_image_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"),
    createdById: integer("created_by")
      .notNull()
      .references(() => users.id),
    updatedById: integer("updated_by").references(() => users.id),
    deletedById: integer("deleted_by").references(() => users.id),
  },
  (table) => {
    return {
      defaultImageRelation: foreignKey({
        columns: [table.defaultImageId],
        foreignColumns: [modelImages.id],
      }),
    };
  },
);

export type Model = InferModel<typeof models>;
export type ModelID = Model["id"];
export type CreateModel = InferCreateModel<typeof models>;
export type UpdateModel = InferUpdateModel<typeof models>;
export type ArchiveModel = InferArchiveModel<typeof models>;
