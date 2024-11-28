import { relations } from "drizzle-orm";
import {
  foreignKey,
  integer,
  pgTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { auditing, timestamps } from "./columns.helpers";
import { equipmentTypeTable } from "./equipment-type.sql";
import { manufacturerTable } from "./manufacturer.sql";
import { modelImageTable } from "./model-image.sql";
import { organizationTable } from "./organization.sql";

export const modelTable = pgTable(
  "model",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    nickname: varchar().notNull(),
    manufacturerId: integer()
      .notNull()
      .references(() => manufacturerTable.id),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    equipmentTypeId: integer()
      .notNull()
      .references(() => equipmentTypeTable.id),
    defaultImageId: integer(),
    ...timestamps,
    ...auditing,
  },
  (t) => [
    ...auditConstraints(t),
    unique().on(t.name, t.organizationId),
    unique().on(t.nickname, t.organizationId),
    foreignKey({
      columns: [t.defaultImageId],
      foreignColumns: [modelImageTable.id],
    }),
  ],
);

export const modelRelations = relations(modelTable, ({ one, many }) => ({
  images: many(modelImageTable),
  manufacturer: one(manufacturerTable, {
    fields: [modelTable.manufacturerId],
    references: [manufacturerTable.id],
  }),
  organization: one(organizationTable, {
    fields: [modelTable.organizationId],
    references: [organizationTable.id],
  }),
  equipmentType: one(equipmentTypeTable, {
    fields: [modelTable.equipmentTypeId],
    references: [equipmentTypeTable.id],
  }),
  defaultImage: one(modelImageTable, {
    fields: [modelTable.defaultImageId],
    references: [modelImageTable.id],
  }),
}));

export type Model = InferModel<typeof modelTable>;
export type ModelID = Model["id"];
export type CreateModel = InferCreateModel<typeof modelTable>;
export type UpdateModel = InferUpdateModel<typeof modelTable>;
export type ArchiveModel = InferArchiveModel<typeof modelTable>;
