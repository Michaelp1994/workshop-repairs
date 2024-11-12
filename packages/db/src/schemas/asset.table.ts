import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { assetStatusTable } from "./asset-status.table";
import { locationTable } from "./location.table";
import metadataColumns from "./metadata-columns";
import { modelTable } from "./model.table";
import { organizationTable } from "./organization.table";

export const assetTable = pgTable(
  "asset",
  {
    id: serial().primaryKey(),
    serialNumber: varchar().notNull(),
    assetNumber: varchar().notNull(),
    softwareVersion: varchar(),
    statusId: integer()
      .notNull()
      .references(() => assetStatusTable.id),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    modelId: integer()
      .notNull()
      .references(() => modelTable.id),
    clientId: integer()
      .notNull()
      .references(() => modelTable.id),
    locationId: integer()
      .notNull()
      .references(() => locationTable.id),
    ...metadataColumns,
  },
  (t) => [unique().on(t.serialNumber, t.organizationId)],
);

export type Asset = InferModel<typeof assetTable>;
export type AssetID = Asset["id"];
export type CreateAsset = InferCreateModel<typeof assetTable>;
export type UpdateAsset = InferUpdateModel<typeof assetTable>;
export type ArchiveAsset = InferArchiveModel<typeof assetTable>;
