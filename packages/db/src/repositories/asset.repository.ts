import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { createTenantFilter } from "../helpers/createTenantFilter";
import { returnOne } from "../helpers/executeQuery";
import { type DatabaseTransaction } from "../index";
import {
  createColumnFilters,
  createGlobalFilters,
  createSortOrder,
} from "../mappings/assets.mapper";
import { type AssetInput, assetTable } from "../tables/asset.table";
import { assetStatusTable } from "../tables/assetStatus.table";
import { clientTable } from "../tables/client.table";
import { equipmentTypeTable } from "../tables/equipmentType.table";
import { locationTable } from "../tables/location.table";
import { manufacturerTable } from "../tables/manufacturer.table";
import { modelTable } from "../tables/model.table";
import { modelImageTable } from "../tables/modelImage.table";

const assetFields = getTableColumns(assetTable);

interface AssetSelector {
  localId: number;
  organizationId: OrganizationID;
}

export interface AssetFilters {
  modelLocalId?: number | undefined;
  clientLocalId?: number | undefined;
  locationLocalId?: number | undefined;
  manufacturerLocalId?: number | undefined;
  equipmentTypeLocalId?: number | undefined;
}

export default class AssetRepository {
  async archive(
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
    return returnOne(query);
  }
  async count(
    tx: DatabaseTransaction,
    { columnFilters, filters, globalFilter }: CountInput<AssetFilters>,
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
          createTenantFilter(modelTable, filters.modelLocalId, organizationId),
          createTenantFilter(
            clientTable,
            filters.clientLocalId,
            organizationId,
          ),
          createTenantFilter(
            locationTable,
            filters.locationLocalId,
            organizationId,
          ),
          createTenantFilter(
            manufacturerTable,
            filters.manufacturerLocalId,
            organizationId,
          ),
          createTenantFilter(
            equipmentTypeTable,
            filters.equipmentTypeLocalId,
            organizationId,
          ),
          createGlobalFilters(globalFilter),
          ...createColumnFilters(columnFilters),
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<AssetInput>) {
    const query = tx.insert(assetTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    {
      filters,
      columnFilters,
      globalFilter,
      pagination,
      sorting,
    }: GetAllInput<AssetFilters>,
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
          createTenantFilter(modelTable, filters.modelLocalId, organizationId),
          createTenantFilter(
            clientTable,
            filters.clientLocalId,
            organizationId,
          ),
          createTenantFilter(
            locationTable,
            filters.locationLocalId,
            organizationId,
          ),
          createTenantFilter(
            manufacturerTable,
            filters.manufacturerLocalId,
            organizationId,
          ),
          createTenantFilter(
            equipmentTypeTable,
            filters.equipmentTypeLocalId,
            organizationId,
          ),
          createGlobalFilters(globalFilter),
          ...createColumnFilters(columnFilters),
        ),
      )
      .orderBy(...createSortOrder(sorting), assetTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);

    const res = await query.execute();
    return res;
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput<AssetFilters>,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: assetTable.localId,
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

  async getByLocalId(
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
    return await returnOne(query);
  }

  async update(
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
    return await returnOne(query);
  }
}
