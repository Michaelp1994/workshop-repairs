import { type InferInsertModel } from "drizzle-orm";
import {
  type AnyPgColumn,
  integer,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { modelTable } from "./model.table";

export const modelImageTable = pgTable(
  "model_image",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    url: varchar().notNull(),
    caption: varchar(),
    modelId: integer()
      .notNull()
      .references((): AnyPgColumn => modelTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export type ModelImage = InferModel<typeof modelImageTable>;
export type ModelImageID = ModelImage["id"];
export type ModelImageInput = InferInsertModel<typeof modelImageTable>;
