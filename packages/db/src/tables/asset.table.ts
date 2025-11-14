import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import { assetStatusTable } from "./assetStatus.table";
import auditConstraints from "../helpers/auditConstraints";
import { clientTable } from "./client.table";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { locationTable } from "./location.table";
import { modelTable } from "./model.table";
import { organizationTable } from "./organization.table";
import { repairTable } from "./repair.table";

export const assetTable = pgTable(
  "asset",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
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
    unique().on(t.localId, t.organizationId),
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
export type AssetInput = InferInsertModel<typeof assetTable>;

export type AssetID = Asset["id"];
