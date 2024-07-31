import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import type {
  InferCreateModel,
  InferDeleteModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { assetStatuses } from "./asset-statuses.schema";
import { locations } from "./locations.schema";
import { models } from "./models.schema";
import { users } from "./users.schema";

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  serialNumber: varchar("serial_number").notNull().unique(),
  assetNumber: varchar("asset_number").notNull(),
  softwareVersion: varchar("software_version"),
  statusId: integer("status_id")
    .notNull()
    .references(() => assetStatuses.id),
  modelId: integer("model_id")
    .notNull()
    .references(() => models.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
});

export type Asset = InferModel<typeof assets>;
export type AssetID = Asset["id"];
export type CreateAsset = InferCreateModel<typeof assets>;
export type UpdateAsset = InferUpdateModel<typeof assets>;
export type DeleteAsset = InferDeleteModel<typeof assets>;
