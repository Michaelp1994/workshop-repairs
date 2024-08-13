import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const equipmentTypes = pgTable("equipment_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  imageUrl: text("image_url"),
  ...metadataColumns,
});

export type EquipmentType = InferModel<typeof equipmentTypes>;
export type EquipmentTypeID = EquipmentType["id"];
export type CreateEquipmentType = InferCreateModel<typeof equipmentTypes>;
export type UpdateEquipmentType = InferUpdateModel<typeof equipmentTypes>;
export type ArchiveEquipmentType = InferArchiveModel<typeof equipmentTypes>;
