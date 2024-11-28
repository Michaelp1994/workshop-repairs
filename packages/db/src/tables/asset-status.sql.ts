import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { assetTable } from "./asset.sql";
import auditConstraints from "./audit-constraints.helpers";
import { auditing, timestamps } from "./columns.helpers";

export const assetStatusTable = pgTable(
  "asset_status",
  {
    id: serial().primaryKey(),
    name: text().notNull().unique(),
    ...timestamps,
    ...auditing,
  },
  (t) => [...auditConstraints(t)],
);

export const assetStatusRelations = relations(assetStatusTable, ({ many }) => ({
  assets: many(assetTable),
}));
export type AssetStatus = InferModel<typeof assetStatusTable>;
export type AssetStatusID = AssetStatus["id"];
export type CreateAssetStatus = InferCreateModel<typeof assetStatusTable>;
export type UpdateAssetStatus = InferUpdateModel<typeof assetStatusTable>;
export type ArchiveAssetStatus = InferArchiveModel<typeof assetStatusTable>;
