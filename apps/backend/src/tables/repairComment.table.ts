import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../services/types";
import { repairTable } from "./repair.table";

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

export type RepairComment = InferModel<typeof repairCommentTable>;
export type RepairCommentID = RepairComment["id"];
export type RepairCommentInput = InferInsertModel<typeof repairCommentTable>;
