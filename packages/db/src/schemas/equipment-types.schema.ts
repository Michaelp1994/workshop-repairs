import { integer, pgTable, serial, text, unique } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { organizations } from "./organizations.schema";

export const equipmentTypes = pgTable(
  "equipment_types",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id),
    ...metadataColumns,
  },
  (t) => ({
    nameUnq: unique().on(t.name, t.organizationId),
  }),
);

export type EquipmentType = InferModel<typeof equipmentTypes>;
export type EquipmentTypeID = EquipmentType["id"];
export type CreateEquipmentType = InferCreateModel<typeof equipmentTypes>;
export type UpdateEquipmentType = InferUpdateModel<typeof equipmentTypes>;
export type ArchiveEquipmentType = InferArchiveModel<typeof equipmentTypes>;
