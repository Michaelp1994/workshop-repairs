import type { GetAssetsSelectSchema } from "@repo/validators/server/assets.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type {
  ArchiveInput,
  BaseCountQuery,
  BaseDataTableQuery,
  CreateInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  createColumnFilters,
  createGlobalFilters,
  createSortOrder,
  createTenantFilter,
} from "../mappings/assets.mapper";
import { assetStatusTable } from "../tables/asset-status.sql";
import { type AssetInput, assetTable } from "../tables/asset.sql";
import { clientTable } from "../tables/client.sql";
import { equipmentTypeTable } from "../tables/equipment-type.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { modelTable } from "../tables/model.sql";

const assetFields = getTableColumns(assetTable);

interface AssetSelector {
  localId: number;
  organizationId: OrganizationID;
}

interface AssetFilters {
  model?: number;
  client?: number;
  location?: number;
  manufacturer?: number;
  equipmentType?: number;
}

export interface AssetDataTableParameters extends BaseDataTableQuery {
  filters: AssetFilters;
}

export interface AssetCountParameters extends BaseCountQuery {
  filters: AssetFilters;
}

export async function getAllAssets(
  tx: DatabaseTransaction,
  {
    filters,
    columnFilters,
    globalFilter,
    pagination,
    sorting,
  }: AssetDataTableParameters,
  organizationId: OrganizationID,
) {
  const query = tx
    .select({
      ...assetFields,
      location: locationTable,
      status: assetStatusTable,
      client: clientTable,
      model: {
        id: modelTable.id,
        name: modelTable.name,
        imageUrl: modelImageTable.url,
        manufacturer: manufacturerTable.name,
      },
    })
    .from(assetTable)
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(clientTable, eq(assetTable.clientId, clientTable.id))
    .innerJoin(
      equipmentTypeTable,
      eq(modelTable.equipmentTypeId, equipmentTypeTable.id),
    )
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(
      and(
        isNull(assetTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        createTenantFilter(modelTable, filters.model, organizationId),
        createTenantFilter(clientTable, filters.client, organizationId),
        createTenantFilter(locationTable, filters.location, organizationId),
        createTenantFilter(
          manufacturerTable,
          filters.manufacturer,
          organizationId,
        ),
        createTenantFilter(
          equipmentTypeTable,
          filters.equipmentType,
          organizationId,
        ),
        createGlobalFilters(globalFilter),
        ...createColumnFilters(columnFilters),
      ),
    )
    .orderBy(...createSortOrder(sorting), assetTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);

  const res = query.execute();
  return res;
}

export async function countAssets(
  tx: DatabaseTransaction,
  { columnFilters, filters, globalFilter }: AssetCountParameters,
  organizationId: OrganizationID,
) {
  const query = tx
    .select({ count: count() })
    .from(assetTable)
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(clientTable, eq(assetTable.clientId, clientTable.id))
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(
      and(
        isNull(assetTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        createTenantFilter(modelTable, filters.model, organizationId),
        createTenantFilter(clientTable, filters.client, organizationId),
        createTenantFilter(locationTable, filters.location, organizationId),
        createTenantFilter(
          manufacturerTable,
          filters.manufacturer,
          organizationId,
        ),
        createTenantFilter(
          equipmentTypeTable,
          filters.equipmentType,
          organizationId,
        ),
        createGlobalFilters(globalFilter),
        ...createColumnFilters(columnFilters),
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getAsset(
  tx: DatabaseTransaction,
  { localId, organizationId }: AssetSelector,
) {
  const { createdByTable, deletedByTable, metadata, updatedByTable } =
    createMetadataFields();
  const query = tx
    .select({
      ...assetFields,
      location: locationTable,
      status: assetStatusTable,
      model: {
        id: modelTable.id,
        name: modelTable.name,
        manufacturer: manufacturerTable.name,
        image: modelImageTable.url,
      },
      client: clientTable,
      ...metadata,
    })
    .from(assetTable)
    .innerJoin(createdByTable, eq(assetTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(assetTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(assetTable.deletedById, deletedByTable.id))
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(clientTable, eq(assetTable.clientId, clientTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .where(
      and(
        eq(assetTable.localId, localId),
        eq(assetTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function getAssetsSelect(
  tx: DatabaseTransaction,
  _input: GetAssetsSelectSchema,
  organizationId: OrganizationID,
) {
  const query = tx
    .select({
      value: assetTable.id,
      label: assetTable.serialNumber,
    })
    .from(assetTable)
    .where(
      and(
        eq(assetTable.organizationId, organizationId),
        isNull(assetTable.deletedAt),
      ),
    )
    .orderBy(assetTable.id);

  const res = await query.execute();
  return res;
}

export async function createAsset(
  tx: DatabaseTransaction,
  input: CreateInput<AssetInput>,
) {
  const query = tx.insert(assetTable).values(input).returning();
  const [asset] = await query.execute();
  return asset;
}

export async function updateAsset(
  tx: DatabaseTransaction,
  values: UpdateInput<AssetInput>,
  { localId, organizationId }: AssetSelector,
) {
  const query = tx
    .update(assetTable)
    .set(values)
    .where(
      and(
        eq(assetTable.localId, localId),
        eq(assetTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveAsset(
  tx: DatabaseTransaction,
  values: ArchiveInput<AssetInput>,
  { localId, organizationId }: AssetSelector,
) {
  const query = tx
    .update(assetTable)
    .set(values)
    .where(
      and(
        eq(assetTable.localId, localId),
        eq(assetTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
