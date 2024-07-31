import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { users } from "./users.schema";

export const assetStatuses = pgTable("asset_statuses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type AssetStatus = InferModel<typeof assetStatuses>;
export type AssetStatusID = AssetStatus["id"];
export type CreateAssetStatus = InferCreateModel<typeof assetStatuses>;
export type UpdateAssetStatus = InferUpdateModel<typeof assetStatuses>;
export type DeleteAssetStatus = InferDeleteModel<typeof assetStatuses>;
