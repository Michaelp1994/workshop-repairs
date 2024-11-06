import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

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
import { organizations } from "./organization.schema";

export const assets = pgTable(
  "assets",
  {
    id: serial("id").primaryKey(),
    serialNumber: varchar("serial_number").notNull(),
    assetNumber: varchar("asset_number").notNull(),
    softwareVersion: varchar("software_version"),
    statusId: integer("status_id")
      .notNull()
      .references(() => assetStatuses.id),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id),
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
  },
  (t) => ({
    serialNumberUnq: unique().on(t.serialNumber, t.organizationId),
  }),
);

export type Asset = InferModel<typeof assets>;
export type AssetID = Asset["id"];
export type CreateAsset = InferCreateModel<typeof assets>;
export type UpdateAsset = InferUpdateModel<typeof assets>;
export type ArchiveAsset = InferArchiveModel<typeof assets>;
