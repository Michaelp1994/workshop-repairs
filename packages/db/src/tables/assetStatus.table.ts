import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";

export const assetStatusTable = pgTable(
  "asset_status",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull().unique(),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export type AssetStatus = InferModel<typeof assetStatusTable>;
export type AssetStatusID = AssetStatus["id"];
export type AssetStatusInput = InferInsertModel<typeof assetStatusTable>;
