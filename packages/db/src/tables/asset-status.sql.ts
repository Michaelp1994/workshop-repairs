import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import { assetTable } from "./asset.sql";
import auditConstraints from "./audit-constraints.helpers";
import { laxAuditing, timestamps } from "./columns.helpers";

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

export const assetStatusRelations = relations(assetStatusTable, ({ many }) => ({
  assets: many(assetTable),
}));

export type AssetStatus = InferModel<typeof assetStatusTable>;
export type AssetStatusID = AssetStatus["id"];
export type AssetStatusInput = InferInsertModel<typeof assetStatusTable>;
