import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { modelTable } from "./model.table";
import { organizationTable } from "./organization.table";

export const equipmentTypeTable = pgTable(
  "equipment_type",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    name: text().notNull(),
    imageUrl: text(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    unique().on(t.name, t.organizationId),
    unique().on(t.localId, t.organizationId),
    ...auditConstraints(t),
  ],
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
export type EquipmentTypeInput = InferInsertModel<typeof equipmentTypeTable>;
