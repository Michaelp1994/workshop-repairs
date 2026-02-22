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
import { returnOne } from "../helpers/executeQuery";
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/repairs.mapper";
import { assetTable } from "../tables/asset.table";
import { clientTable } from "../tables/client.table";
import { locationTable } from "../tables/location.table";
import { manufacturerTable } from "../tables/manufacturer.table";
import { modelTable } from "../tables/model.table";
import { modelImageTable } from "../tables/modelImage.table";
import { type RepairInput, repairTable } from "../tables/repair.table";
import { repairStatusTypeTable } from "../tables/repairStatusType.table";
import { repairTypeTable } from "../tables/repairType.table";

const repairFields = getTableColumns(repairTable);

interface RepairFilters {
  assetId?: number | undefined;
  clientId?: number | undefined;
}
export default class RepairRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(repairTable)
      .set(input)
      .where(
        and(
          eq(repairTable.localId, localId),
          eq(repairTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }

  async count(
    tx: DatabaseTransaction,
    { globalFilter, columnFilters, filters }: CountInput<RepairFilters>,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({ count: count() })
      .from(repairTable)
      .innerJoin(assetTable, eq(repairTable.assetId, assetTable.id))
      .innerJoin(repairTypeTable, eq(repairTable.typeId, repairTypeTable.id))
      .innerJoin(
        repairStatusTypeTable,
        eq(repairTable.statusId, repairStatusTypeTable.id),
      )
      .where(
        and(
          filters.assetId
            ? eq(repairTable.assetId, filters.assetId)
            : undefined,
          filters.clientId
            ? eq(repairTable.clientId, filters.clientId)
            : undefined,
          isNull(repairTable.deletedAt),
          eq(assetTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<RepairInput>) {
    const query = tx.insert(repairTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    {
      globalFilter,
      sorting,
      pagination,
      columnFilters,
      filters,
    }: GetAllInput<RepairFilters>,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);

    const query = tx
      .select({
        ...repairFields,
        asset: {
          id: assetTable.id,
          serialNumber: assetTable.serialNumber,
          assetNumber: assetTable.assetNumber,
          imageUrl: modelImageTable.url,
        },
        status: repairStatusTypeTable,
        type: repairTypeTable,
        client: clientTable,
      })
      .from(repairTable)
      .innerJoin(assetTable, eq(repairTable.assetId, assetTable.id))
      .innerJoin(clientTable, eq(repairTable.clientId, clientTable.id))
      .innerJoin(repairTypeTable, eq(repairTable.typeId, repairTypeTable.id))
      .innerJoin(
        repairStatusTypeTable,
        eq(repairTable.statusId, repairStatusTypeTable.id),
      )
      .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
      .leftJoin(
        modelImageTable,
        eq(modelTable.defaultImageId, modelImageTable.id),
      )
      .where(
        and(
          filters.assetId
            ? eq(repairTable.assetId, filters.assetId)
            : undefined,
          filters.clientId
            ? eq(repairTable.clientId, filters.clientId)
            : undefined,
          isNull(repairTable.deletedAt),
          eq(assetTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, repairTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput<RepairFilters>,
    _organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: repairTable.id,
        label: repairTable.fault,
      })
      .from(repairTable)
      .where(isNull(repairTable.deletedAt));
    return query.execute();
  }

  async getByLocalId(
    tx: DatabaseTransaction,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const { createdByTable, deletedByTable, metadata, updatedByTable } =
      createMetadataFields();
    const query = tx
      .select({
        ...repairFields,
        asset: assetTable,
        model: {
          id: modelTable.id,
          name: modelTable.name,
          imageUrl: modelImageTable.url,
        },
        location: locationTable,
        manufacturer: manufacturerTable,
        type: repairTypeTable,
        status: repairStatusTypeTable,
        client: clientTable,
        ...metadata,
      })
      .from(repairTable)
      .innerJoin(createdByTable, eq(repairTable.createdById, createdByTable.id))
      .leftJoin(updatedByTable, eq(repairTable.updatedById, updatedByTable.id))
      .leftJoin(deletedByTable, eq(repairTable.deletedById, deletedByTable.id))
      .innerJoin(clientTable, eq(repairTable.clientId, clientTable.id))
      .innerJoin(assetTable, eq(repairTable.assetId, assetTable.id))
      .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
      .leftJoin(
        modelImageTable,
        eq(modelTable.defaultImageId, modelImageTable.id),
      )
      .innerJoin(
        manufacturerTable,
        eq(modelTable.manufacturerId, manufacturerTable.id),
      )
      .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
      .innerJoin(repairTypeTable, eq(repairTable.typeId, repairTypeTable.id))
      .innerJoin(
        repairStatusTypeTable,
        eq(repairTable.statusId, repairStatusTypeTable.id),
      )
      .where(
        and(
          eq(repairTable.localId, localId),
          eq(repairTable.organizationId, organizationId),
        ),
      );

    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(repairTable)
      .set(input)
      .where(
        and(
          eq(repairTable.localId, localId),
          eq(repairTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }
}
