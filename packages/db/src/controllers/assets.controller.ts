import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organizations.schema";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type Database, db } from "../index";
import {
  assetFilterMapping,
  assetOrderMapping,
} from "../mappings/assets.mappings";
import { assetStatuses } from "../schemas/asset-statuses.schema";
import {
  type ArchiveAsset,
  type AssetID,
  assets,
  type CreateAsset,
  type UpdateAsset,
} from "../schemas/assets.schema";
import { clients } from "../schemas/clients.schema";
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

export function getAll(
  { globalFilter, sorting, pagination, columnFilters }: GetAllInput,
  organizationId: OrganizationID,
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
      ...assetFields,
      location: {
        id: locations.id,
        name: locations.name,
      },
      status: {
        id: assetStatuses.id,
        name: assetStatuses.name,
      },
      client: {
        id: clients.id,
        name: clients.name,
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
    .innerJoin(clients, eq(assets.clientId, clients.id))
    .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
    .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
    .where(
      and(
        isNull(assets.deletedAt),
        eq(assets.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, assets.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);

  return query.execute();
}

export async function getCount(
  { globalFilter, columnFilters }: GetCountInput,
  organizationId: OrganizationID,
) {
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
    .innerJoin(locations, eq(assets.locationId, locations.id))
    .innerJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
    .innerJoin(models, eq(assets.modelId, models.id))
    .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
    .where(
      and(
        isNull(assets.deletedAt),
        eq(assets.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}
export async function getSelect(
  { limit, cursor }: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({ value: assets.id, label: assets.serialNumber })
    .from(assets)
    .orderBy(assets.id)
    .limit(limit + 1)
    .where(
      and(eq(assets.organizationId, organizationId), isNull(assets.deletedAt)),
    )
    .offset(cursor);

  const data = await query.execute();
  const nextCursor = data.length > limit ? data.pop()?.value : undefined;
  return { data, nextCursor };
}

export async function getSimpleSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({
      ...assetFields,
      model: {
        id: models.id,
        name: models.name,
        imageUrl: modelImages.url,
      },
      manufacturer: {
        id: manufacturers.id,
        name: manufacturers.name,
      },
    })
    .from(assets)
    .innerJoin(models, eq(assets.modelId, models.id))
    .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
    .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
    .where(
      and(eq(assets.organizationId, organizationId), isNull(assets.deletedAt)),
    )
    .orderBy(assets.id);

  const res = await query.execute();
  return res;
}

export async function getById(id: AssetID, organizationId: OrganizationID) {
  const query = db
    .select({
      ...assetFields,
      location: {
        id: locations.id,
        name: locations.name,
        address: locations.address,
      },
    })
    .from(assets)
    .innerJoin(locations, eq(assets.locationId, locations.id))
    .innerJoin(assetStatuses, eq(assets.statusId, assetStatuses.id))
    .innerJoin(models, eq(assets.modelId, models.id))
    .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
    .where(and(eq(assets.id, id), eq(assets.organizationId, organizationId)));
  const [res] = await query.execute();
  return res;
}

export async function getByRepairId(
  id: RepairID,
  organizationId: OrganizationID,
) {
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
    .where(
      and(
        eq(assets.id, repair.assetId),
        eq(assets.organizationId, organizationId),
      ),
    );
  const [asset] = await assetQuery.execute();
  return asset;
}
export async function create(input: CreateAsset) {
  const query = db.insert(assets).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(
  { id, ...values }: UpdateAsset,
  organizationId: OrganizationID,
) {
  const query = db
    .update(assets)
    .set(values)
    .where(and(eq(assets.id, id), eq(assets.organizationId, organizationId)))
    .returning();
  const [res] = await query.execute();
  return res;
}
export async function archive(
  { id, ...values }: ArchiveAsset,
  organizationId: OrganizationID,
) {
  const query = db
    .update(assets)
    .set(values)
    .where(and(eq(assets.id, id), eq(assets.organizationId, organizationId)))
    .returning();
  const [res] = await query.execute();
  return res;
}
