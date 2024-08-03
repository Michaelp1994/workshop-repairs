import { pgTable, serial, text } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import metadataColumns from "./metadata-columns";

export const assetStatuses = pgTable("asset_statuses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  ...metadataColumns,
});

export type AssetStatus = InferModel<typeof assetStatuses>;
export type AssetStatusID = AssetStatus["id"];
export type CreateAssetStatus = InferCreateModel<typeof assetStatuses>;
export type UpdateAssetStatus = InferUpdateModel<typeof assetStatuses>;
export type ArchiveAssetStatus = InferArchiveModel<typeof assetStatuses>;
