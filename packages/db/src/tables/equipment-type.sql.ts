import { relations } from "drizzle-orm";
import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { modelTable } from "./model.sql";
import { organizationTable } from "./organization.sql";

export const equipmentTypeTable = pgTable(
  "equipment_type",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    imageUrl: text(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.name, t.organizationId), ...auditConstraints(t)],
);

export const equipmentTypeRelations = relations(
  equipmentTypeTable,
  ({ one, many }) => ({
    models: many(modelTable),
    organization: one(organizationTable, {
      fields: [equipmentTypeTable.organizationId],
      references: [organizationTable.id],
    }),
  }),
);

export type EquipmentType = InferModel<typeof equipmentTypeTable>;
export type EquipmentTypeID = EquipmentType["id"];
export type CreateEquipmentType = InferCreateModel<typeof equipmentTypeTable>;
export type UpdateEquipmentType = InferUpdateModel<typeof equipmentTypeTable>;
export type ArchiveEquipmentType = InferArchiveModel<typeof equipmentTypeTable>;
