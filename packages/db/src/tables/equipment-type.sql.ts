import { integer, pgTable, serial, text, unique } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.sql";

export const equipmentTypeTable = pgTable(
  "equipment_type",
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    imageUrl: text(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...metadataColumns,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

export type EquipmentType = InferModel<typeof equipmentTypeTable>;
export type EquipmentTypeID = EquipmentType["id"];
export type CreateEquipmentType = InferCreateModel<typeof equipmentTypeTable>;
export type UpdateEquipmentType = InferUpdateModel<typeof equipmentTypeTable>;
export type ArchiveEquipmentType = InferArchiveModel<typeof equipmentTypeTable>;
