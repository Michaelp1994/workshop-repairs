import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../services/types";
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

export type EquipmentType = InferModel<typeof equipmentTypeTable>;
export type EquipmentTypeID = EquipmentType["id"];
export type EquipmentTypeInput = InferInsertModel<typeof equipmentTypeTable>;
