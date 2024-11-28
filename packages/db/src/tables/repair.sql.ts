import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { assetTable } from "./asset.sql";
import { clientTable } from "./client.sql";
import { auditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";
import { repairCommentTable } from "./repair-comment.sql";
import { repairImageTable } from "./repair-image.sql";
import { repairPartTable } from "./repair-part.sql";
import { repairStatusTypeTable } from "./repair-status-type.sql";
import { repairTypeTable } from "./repair-type.sql";

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
  ...timestamps,
  ...auditing,
});

export const repairRelations = relations(repairTable, ({ one, many }) => ({
  images: many(repairImageTable),
  comments: many(repairCommentTable),
  parts: many(repairPartTable),
  asset: one(assetTable, {
    fields: [repairTable.assetId],
    references: [assetTable.id],
  }),
  status: one(repairStatusTypeTable, {
    fields: [repairTable.statusId],
    references: [repairStatusTypeTable.id],
  }),
  type: one(repairTypeTable, {
    fields: [repairTable.typeId],
    references: [repairTypeTable.id],
  }),
  organization: one(organizationTable, {
    fields: [repairTable.organizationId],
    references: [organizationTable.id],
  }),
  client: one(clientTable, {
    fields: [repairTable.clientId],
    references: [clientTable.id],
  }),
}));

export type Repair = InferModel<typeof repairTable>;
export type RepairID = Repair["id"];
export type CreateRepair = InferCreateModel<typeof repairTable>;
export type UpdateRepair = InferUpdateModel<typeof repairTable>;
export type ArchiveRepair = InferArchiveModel<typeof repairTable>;
