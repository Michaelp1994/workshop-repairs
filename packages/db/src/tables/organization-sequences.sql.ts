import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import { strictAuditing, timestamps } from "./columns.helpers";
import { organizationTable } from "./organization.sql";

export const organizationSequenceTable = pgTable("organization_sequence", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organizationId: integer()
    .notNull()
    .references(() => organizationTable.id),
  assetKeyPrefix: varchar({ length: 10 }).notNull(),
  clientKeyPrefix: varchar({ length: 10 }).notNull(),
  equipmentTypeKeyPrefix: varchar({ length: 10 }).notNull(),
  locationKeyPrefix: varchar({ length: 10 }).notNull(),
  manufacturerKeyPrefix: varchar({ length: 10 }).notNull(),
  modelKeyPrefix: varchar({ length: 10 }).notNull(),
  partKeyPrefix: varchar({ length: 10 }).notNull(),
  repairKeyPrefix: varchar({ length: 10 }).notNull(),
  assetLastUsedValue: integer().notNull().default(0),
  clientLastUsedValue: integer().notNull().default(0),
  equipmentTypeLastUsedValue: integer().notNull().default(0),
  locationLastUsedValue: integer().notNull().default(0),
  manufacturerLastUsedValue: integer().notNull().default(0),
  modelLastUsedValue: integer().notNull().default(0),
  partLastUsedValue: integer().notNull().default(0),
  repairLastUsedValue: integer().notNull().default(0),
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
export type OrganizationSequenceInput = InferInsertModel<
  typeof organizationSequenceTable
>;
