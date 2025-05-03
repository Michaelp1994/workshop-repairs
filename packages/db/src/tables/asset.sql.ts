import { relations } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { assetStatusTable } from "./asset-status.sql";
import auditConstraints from "./audit-constraints.helpers";
import { clientTable } from "./client.sql";
import { strictAuditing, timestamps } from "./columns.helpers";
import { locationTable } from "./location.sql";
import { modelTable } from "./model.sql";
import { organizationTable } from "./organization.sql";
import { repairTable } from "./repair.sql";

export const assetTable = pgTable(
  "asset",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    serialNumber: varchar().notNull(),
    assetNumber: varchar().notNull(),
    softwareVersion: varchar().notNull(),
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
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    unique().on(t.serialNumber, t.organizationId),
    ...auditConstraints(t),
  ],
);

export const assetRelations = relations(assetTable, ({ one, many }) => ({
  repair: many(repairTable),
  organization: one(organizationTable, {
    fields: [assetTable.organizationId],
    references: [organizationTable.id],
  }),
  status: one(assetStatusTable, {
    fields: [assetTable.statusId],
    references: [assetStatusTable.id],
  }),
  model: one(modelTable, {
    fields: [assetTable.modelId],
    references: [modelTable.id],
  }),
  client: one(clientTable, {
    fields: [assetTable.clientId],
    references: [clientTable.id],
  }),
  location: one(locationTable, {
    fields: [assetTable.locationId],
    references: [locationTable.id],
  }),
}));

export type Asset = InferModel<typeof assetTable>;
export type AssetID = Asset["id"];
export type CreateAsset = InferCreateModel<typeof assetTable>;
export type UpdateAsset = InferUpdateModel<typeof assetTable>;
export type ArchiveAsset = InferArchiveModel<typeof assetTable>;
