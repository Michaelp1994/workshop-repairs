import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { getOrderByParams } from "../helpers/getOrderByParams";
import {
  type DeleteRepair,
  type CreateRepair,
  repairs,
  type UpdateRepair,
  type RepairID,
} from "../schemas/repairs.schema";
import { repairTypes } from "../schemas/repair-types.schema";
import { repairStatusTypes } from "../schemas/repair-status-types.schema";
import { assets } from "../schemas/assets.schema";
import { type Database } from "../index";
import { manufacturers } from "../schemas/manufacturers.schema";
import { models } from "../schemas/models.schema";
import { locations } from "../schemas/locations.schema";
import { modelImages } from "../schemas/model-images.schema";

import {
  repairFilterMapping,
  repairOrderMapping,
} from "../mappings/repairs.mappings";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getColumnFilterParams } from "../helpers/getColumnFilters";

const repairFields = getTableColumns(repairs);
const assetFields = getTableColumns(assets);

const globalFilterColumns = [
  repairs.fault,
  repairs.summary,
  repairStatusTypes.name,
  repairTypes.name,
  assets.assetNumber,
  assets.serialNumber,
  repairs.clientReference,
];

export default {
  getAll(
    { globalFilter, sorting, pagination, columnFilters }: GetAll,
    db: Database,
  ) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      repairFilterMapping,
    );
    const orderByParams = getOrderByParams(sorting, repairOrderMapping);

    const query = db
      .select({
        id: repairs.id,
        fault: repairs.fault,
        summary: repairs.summary,
        clientReference: repairs.clientReference,
        createdAt: repairs.createdAt,
        updatedAt: repairs.updatedAt,
        asset: {
          id: assets.id,
          serialNumber: assets.serialNumber,
          assetNumber: assets.assetNumber,
          imageUrl: modelImages.url,
        },
        status: {
          id: repairStatusTypes.id,
          name: repairStatusTypes.name,
          colour: repairStatusTypes.colour,
        },
        type: {
          id: repairTypes.id,
          name: repairTypes.name,
        },
      })
      .from(repairs)
      .innerJoin(assets, eq(repairs.assetId, assets.id))
      .innerJoin(repairTypes, eq(repairs.typeId, repairTypes.id))
      .innerJoin(repairStatusTypes, eq(repairs.statusId, repairStatusTypes.id))
      .innerJoin(models, eq(assets.modelId, models.id))
      .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
      .where(
        and(
          isNull(repairs.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, repairs.id)
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
      repairFilterMapping,
    );

    const query = db
      .select({ value: count() })
      .from(repairs)
      .innerJoin(assets, eq(repairs.assetId, assets.id))
      .innerJoin(repairTypes, eq(repairs.typeId, repairTypes.id))
      .innerJoin(repairStatusTypes, eq(repairs.statusId, repairStatusTypes.id))
      .where(
        and(
          isNull(repairs.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.value;
  },
  async getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({
        value: repairs.id,
        label: repairs.fault,
      })
      .from(repairs)
      .where(isNull(repairs.deletedAt));
    return query.execute();
  },
  async getById(input: RepairID, db: Database) {
    const query = db
      .select({
        ...repairFields,
        asset: {
          ...assetFields,
        },
        model: {
          id: models.id,
          name: models.name,
          imageUrl: modelImages.url,
        },
        location: {
          id: locations.id,
          name: locations.name,
        },
        manufacturer: {
          id: manufacturers.id,
          name: manufacturers.name,
        },
        type: {
          id: repairTypes.id,
          name: repairTypes.name,
        },
        status: {
          id: repairStatusTypes.id,
          name: repairStatusTypes.name,
          colour: repairStatusTypes.colour,
        },
      })
      .from(repairs)
      .innerJoin(assets, eq(repairs.assetId, assets.id))
      .innerJoin(models, eq(assets.modelId, models.id))
      .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
      .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .innerJoin(locations, eq(assets.locationId, locations.id))
      .innerJoin(repairTypes, eq(repairs.typeId, repairTypes.id))
      .innerJoin(repairStatusTypes, eq(repairs.statusId, repairStatusTypes.id))
      .where(eq(repairs.id, input));

    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateRepair, db: Database) {
    const query = db.insert(repairs).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateRepair, db: Database) {
    const query = db
      .update(repairs)
      .set(input)
      .where(eq(repairs.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete({ id, ...input }: DeleteRepair, db: Database) {
    const query = db
      .update(repairs)
      .set(input)
      .where(eq(repairs.id, id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
