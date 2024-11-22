import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const repairTypeTable = pgTable("repair_type", {
  id: serial().primaryKey(),
  name: text().notNull().unique(),
  ...metadataColumns,
});

export type RepairType = InferModel<typeof repairTypeTable>;
export type RepairTypeID = RepairType["id"];
export type CreateRepairType = InferCreateModel<typeof repairTypeTable>;
export type UpdateRepairType = InferUpdateModel<typeof repairTypeTable>;
export type ArchiveRepairType = InferArchiveModel<typeof repairTypeTable>;
