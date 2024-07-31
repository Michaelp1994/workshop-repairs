import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  assetFilterMapping,
  assetOrderMapping,
} from "../mappings/assets.mappings";
import { assetStatuses } from "../schemas/asset-statuses.schema";
import {
  type AssetID,
  assets,
  type CreateAsset,
  type DeleteAsset,
  type UpdateAsset,
} from "../schemas/assets.schema";
import { locations } from "../schemas/locations.schema";
import { manufacturers } from "../schemas/manufacturers.schema";
import { modelImages } from "../schemas/model-images.schema";
import { models } from "../schemas/models.schema";
import { type RepairID, repairs } from "../schemas/repairs.schema";

const assetFields = getTableColumns(assets);

const globalFilterColumns = [
  assets.assetNumber,
  assets.serialNumber,
  locations.name,
  manufacturers.name,
  models.name,
];

export default {
  getAll(
    { globalFilter, sorting, pagination, columnFilters }: GetAll,
    db: Database,
  ) {
    const orderByParams = getOrderByParams(sorting, assetOrderMapping);
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      assetFilterMapping,
    );

    const query = db
      .select({
        id: assets.id,
        assetNumber: assets.assetNumber,
        serialNumber: assets.serialNumber,
        createdAt: assets.createdAt,
        updatedAt: assets.updatedAt,
        location: {
          id: locations.id,
          name: locations.name,
        },
        status: {
          id: assetStatuses.id,
          name: assetStatuses.name,
        },
        model: {
          id: models.id,
          nickname: models.nickname,
          imageUrl: modelImages.url,
        },
        manufacturer: {
          id: manufacturers.id,
          name: manufacturers.name,
        },
      })
      .from(assets)
      .innerJoin(locations, eq(assets.locationId, locations.id))
      .innerJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
      .innerJoin(models, eq(assets.modelId, models.id))
      .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
      .where(
        and(
          isNull(assets.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, assets.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);

    return query.execute();
  },

  async getCount({ globalFilter, columnFilters }: GetCount, db: Database) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      assetFilterMapping,
    );

    const query = db
      .select({ count: count() })
      .from(assets)
      .leftJoin(locations, eq(assets.locationId, locations.id))
      .leftJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
      .leftJoin(models, eq(assets.modelId, models.id))
      .leftJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .where(
        and(
          isNull(assets.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  },
  async getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({ value: assets.id, label: assets.serialNumber })
      .from(assets)
      .orderBy(assets.id);

    const res = await query.execute();
    return res;
  },

  async getById(id: AssetID, db: Database) {
    const query = db
      .select({
        ...assetFields,
      })
      .from(assets)
      .innerJoin(locations, eq(assets.locationId, locations.id))
      .innerJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
      .innerJoin(models, eq(assets.modelId, models.id))
      .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .where(eq(assets.id, id));
    const [res] = await query.execute();
    return res;
  },

  async getByRepairId(id: RepairID, db: Database) {
    const repairQuery = db
      .select({
        assetId: repairs.assetId,
      })
      .from(repairs)
      .where(eq(repairs.id, id));
    const [repair] = await repairQuery.execute();

    if (!repair) {
      return;
    }

    const assetQuery = db
      .select()
      .from(assets)
      .leftJoin(locations, eq(assets.locationId, locations.id))
      .leftJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
      .leftJoin(models, eq(assets.modelId, models.id))
      .leftJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .where(eq(assets.id, repair.assetId));
    const [asset] = await assetQuery.execute();
    return asset;
  },
  async create(input: CreateAsset, db: Database) {
    const query = db.insert(assets).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update({ id, ...values }: UpdateAsset, db: Database) {
    const query = db
      .update(assets)
      .set(values)
      .where(eq(assets.id, id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
  async delete({ id, ...values }: DeleteAsset, db: Database) {
    const query = db
      .update(assets)
      .set(values)
      .where(eq(assets.id, id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
