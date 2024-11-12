import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { assetTable } from "./asset.table";
import { clientTable } from "./client.table";
import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.table";
import { repairStatusTypeTable } from "./repair-status-type.table";
import { repairTypeTable } from "./repair-type.table";

export const repairTable = pgTable("repair", {
  id: serial().primaryKey(),
  fault: varchar().notNull(),
  summary: varchar(),
  clientId: integer()
    .notNull()
    .references(() => clientTable.id),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
  clientReference: varchar().notNull(),
  typeId: integer()
    .notNull()
    .references(() => repairTypeTable.id),
  statusId: integer()
    .notNull()
    .references(() => repairStatusTypeTable.id),
  assetId: integer()
    .notNull()
    .references(() => assetTable.id),
  ...metadataColumns,
});

export type Repair = InferModel<typeof repairTable>;
export type RepairID = Repair["id"];
export type CreateRepair = InferCreateModel<typeof repairTable>;
export type UpdateRepair = InferUpdateModel<typeof repairTable>;
export type ArchiveRepair = InferArchiveModel<typeof repairTable>;
