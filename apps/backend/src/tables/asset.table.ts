import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import type { InferModel } from "../services/types";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { assetStatusTable } from "./assetStatus.table";
import { clientTable } from "./client.table";
import { locationTable } from "./location.table";
import { modelTable } from "./model.table";
import { organizationTable } from "./organization.table";

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
      .references(() => clientTable.id),
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

export type Asset = InferModel<typeof assetTable>;
export type AssetInput = InferInsertModel<typeof assetTable>;
export type AssetID = Asset["id"];
