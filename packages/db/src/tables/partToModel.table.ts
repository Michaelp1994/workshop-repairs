import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { modelTable } from "./model.table";
import { partTable } from "./part.table";

export const partToModelTable = pgTable(
  "part_to_model",
  {
    quantity: integer().notNull(),
    partId: integer()
      .notNull()
      .references(() => partTable.id),
    modelId: integer()
      .notNull()
      .references(() => modelTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [
    primaryKey({ columns: [t.partId, t.modelId] }),
    ...auditConstraints(t),
  ],
);

export type PartToModel = InferModel<typeof partToModelTable>;
export type PartToModelInput = InferInsertModel<typeof partToModelTable>;
