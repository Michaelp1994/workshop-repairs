import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";
import { repairTable } from "./repair.table";

export const repairCommentTable = pgTable("repair_comment", {
  id: serial().primaryKey(),
  comment: text().notNull(),
  repairId: integer()
    .notNull()
    .references(() => repairTable.id),
  ...metadataColumns,
});

export type RepairComment = InferModel<typeof repairCommentTable>;
export type RepairCommentID = RepairComment["id"];
export type CreateRepairComment = InferCreateModel<typeof repairCommentTable>;
export type UpdateRepairComment = InferUpdateModel<typeof repairCommentTable>;
export type ArchiveRepairComment = InferArchiveModel<typeof repairCommentTable>;
