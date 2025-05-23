import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { repairTable } from "./repair.sql";

export const repairCommentTable = pgTable(
  "repair_comment",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    comment: text().notNull(),
    repairId: integer()
      .notNull()
      .references(() => repairTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export const repairCommentRelations = relations(
  repairCommentTable,
  ({ one }) => ({
    repair: one(repairTable, {
      fields: [repairCommentTable.repairId],
      references: [repairTable.id],
    }),
  }),
);

export type RepairComment = InferModel<typeof repairCommentTable>;
export type RepairCommentID = RepairComment["id"];
export type CreateRepairComment = InferCreateModel<typeof repairCommentTable>;
export type UpdateRepairComment = InferUpdateModel<typeof repairCommentTable>;
export type ArchiveRepairComment = InferArchiveModel<typeof repairCommentTable>;
