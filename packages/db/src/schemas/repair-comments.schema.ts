import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { repairs } from "./repairs.schema";

export const repairComments = pgTable("repair_comments", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  repairId: integer("repair_id")
    .notNull()
    .references(() => repairs.id),
  ...metadataColumns,
});

export type RepairComment = InferModel<typeof repairComments>;
export type RepairCommentID = RepairComment["id"];
export type CreateRepairComment = InferCreateModel<typeof repairComments>;
export type UpdateRepairComment = InferUpdateModel<typeof repairComments>;
export type ArchiveRepairComment = InferArchiveModel<typeof repairComments>;
