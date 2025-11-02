import type {
  CountRepairsInput,
  GetAllRepairsInput,
  GetRepairsSelectInput,
} from "@repo/validators/server/repairs.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
import { getNextSequenceValue } from "../helpers/getNextSequenceValue";
import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/repairs.mapper";
import { assetTable } from "../tables/asset.sql";
import { clientTable } from "../tables/client.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { modelTable } from "../tables/model.sql";
import { repairStatusTypeTable } from "../tables/repair-status-type.sql";
import { repairTypeTable } from "../tables/repair-type.sql";
import {
  type ArchiveRepair,
  type CreateRepair,
  repairTable,
  type UpdateRepair,
} from "../tables/repair.sql";

const repairFields = getTableColumns(repairTable);

export function getAllRepairs(
  {
    globalFilter,
    sorting,
    pagination,
    columnFilters,
    filters,
  }: GetAllRepairsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);

  const query = db
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
        filters?.assetId ? eq(repairTable.assetId, filters.assetId) : undefined,
        filters?.clientId
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

export async function countRepairs(
  { globalFilter, columnFilters, filters }: CountRepairsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = db
    .select({ value: count() })
    .from(repairTable)
    .innerJoin(assetTable, eq(repairTable.assetId, assetTable.id))
    .innerJoin(repairTypeTable, eq(repairTable.typeId, repairTypeTable.id))
    .innerJoin(
      repairStatusTypeTable,
      eq(repairTable.statusId, repairStatusTypeTable.id),
    )
    .where(
      and(
        filters?.assetId ? eq(repairTable.assetId, filters.assetId) : undefined,
        filters?.clientId
          ? eq(repairTable.clientId, filters.clientId)
          : undefined,
        isNull(repairTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.value;
}

export async function getRepairsSelect(_: GetRepairsSelectInput) {
  const query = db
    .select({
      value: repairTable.id,
      label: repairTable.fault,
    })
    .from(repairTable)
    .where(isNull(repairTable.deletedAt));
  return query.execute();
}

export async function getRepairByLocalId(
  localId: number,
  organizationId: OrganizationID,
) {
  const { createdByTable, deletedByTable, metadata, updatedByTable } =
    createMetadataFields();
  const query = db
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

  const [res] = await query.execute();
  return res;
}

export async function createRepair(input: CreateRepair) {
  return await db.transaction(async (tx) => {
    const localId = await getNextSequenceValue(
      tx,
      input.organizationId,
      "repair",
    );
    const query = tx
      .insert(repairTable)
      .values({ ...input, localId })
      .returning();
    const [res] = await query.execute();
    return res;
  });
}

export async function updateRepair(
  input: UpdateRepair,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(
      and(
        eq(repairTable.localId, localId),
        eq(repairTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepair(
  input: ArchiveRepair,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(
      and(
        eq(repairTable.localId, localId),
        eq(repairTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
