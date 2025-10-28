import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { strictAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";

export const organizationSequenceTable = pgTable("organization_sequence", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
  assetKeyPrefix: varchar({ length: 6 }).notNull(),
  clientKeyPrefix: varchar({ length: 6 }).notNull(),
  equipmentTypeKeyPrefix: varchar({ length: 6 }).notNull(),
  locationKeyPrefix: varchar({ length: 6 }).notNull(),
  manufacturerKeyPrefix: varchar({ length: 6 }).notNull(),
  modelKeyPrefix: varchar({ length: 6 }).notNull(),
  partKeyPrefix: varchar({ length: 6 }).notNull(),
  repairKeyPrefix: varchar({ length: 6 }).notNull(),
  assetNextValue: integer().notNull().default(1),
  clientNextValue: integer().notNull().default(1),
  equipmentTypeNextValue: integer().notNull().default(1),
  locationNextValue: integer().notNull().default(1),
  manufacturerNextValue: integer().notNull().default(1),
  modelNextValue: integer().notNull().default(1),
  partNextValue: integer().notNull().default(1),
  repairNextValue: integer().notNull().default(1),
  ...timestamps,
  ...strictAuditing,
});

export const organizationSequenceRelations = relations(
  organizationSequenceTable,
  ({ one }) => ({
    organization: one(organizationTable, {
      fields: [organizationSequenceTable.organizationId],
      references: [organizationTable.id],
    }),
  }),
);

export type OrganizationSequence = InferModel<typeof organizationSequenceTable>;
export type OrganizationSequenceID = OrganizationSequence["id"];
export type CreateOrganizationSequence = InferCreateModel<
  typeof organizationSequenceTable
>;
export type UpdateOrganizationSequence = InferUpdateModel<
  typeof organizationSequenceTable
>;
export type ArchiveOrganizationSequence = InferArchiveModel<
  typeof organizationSequenceTable
>;
