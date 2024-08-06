import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { assetStatuses } from "./asset-statuses.schema";
import { locations } from "./locations.schema";
import metadataColumns from "./metadata-columns";
import { models } from "./models.schema";

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
  clientId: integer("client_id")
    .notNull()
    .references(() => models.id),
  locationId: integer("location_id")
    .notNull()
    .references(() => locations.id),
  ...metadataColumns,
});

export type Asset = InferModel<typeof assets>;
export type AssetID = Asset["id"];
export type CreateAsset = InferCreateModel<typeof assets>;
export type UpdateAsset = InferUpdateModel<typeof assets>;
export type ArchiveAsset = InferArchiveModel<typeof assets>;
