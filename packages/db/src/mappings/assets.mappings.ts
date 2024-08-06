import { assetStatuses } from "../schemas/asset-statuses.schema";
import { assets } from "../schemas/assets.schema";
import { locations } from "../schemas/locations.schema";
import { manufacturers } from "../schemas/manufacturers.schema";
import { models } from "../schemas/models.schema";
import { FilterMapping, OrderMapping } from "../types";

export const assetOrderMapping: OrderMapping = {
  assetNumber: assets.assetNumber,
  serialNumber: assets.serialNumber,
  location_name: locations.name,
  manufacturer_name: manufacturers.name,
  model_nickname: models.nickname,
  status_name: assetStatuses.name,
  createdAt: assets.createdAt,
  updatedAt: assets.updatedAt,
};

export const assetFilterMapping: FilterMapping = {
  model_id: assets.modelId,
  location_id: assets.locationId
};
