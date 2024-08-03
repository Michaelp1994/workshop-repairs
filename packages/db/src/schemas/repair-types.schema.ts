import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const repairTypes = pgTable("repair_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  ...metadataColumns,
});

export type RepairType = InferModel<typeof repairTypes>;
export type RepairTypeID = RepairType["id"];
export type CreateRepairType = InferCreateModel<typeof repairTypes>;
export type UpdateRepairType = InferUpdateModel<typeof repairTypes>;
export type ArchiveRepairType = InferArchiveModel<typeof repairTypes>;
