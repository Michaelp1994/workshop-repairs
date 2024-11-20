import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/repairs.mapper";
import { assetTable } from "../tables/asset.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";
import {
  type ArchiveRepair,
  type CreateRepair,
  type RepairID,
  repairTable,
  type UpdateRepair,
} from "../tables/repair.sql";
import { repairStatusTypeTable } from "../tables/repair-status-type.sql";
import { repairTypeTable } from "../tables/repair-type.sql";

const repairFields = getTableColumns(repairTable);
const assetFields = getTableColumns(assetTable);

export function getAllRepairs(
  { globalFilter, sorting, pagination, columnFilters }: GetAllInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);

  const query = db
    .select({
      id: repairTable.id,
      fault: repairTable.fault,
      summary: repairTable.summary,
      clientReference: repairTable.clientReference,
      createdAt: repairTable.createdAt,
      updatedAt: repairTable.updatedAt,
      asset: {
        id: assetTable.id,
        serialNumber: assetTable.serialNumber,
        assetNumber: assetTable.assetNumber,
        imageUrl: modelImageTable.url,
      },
      status: {
        id: repairStatusTypeTable.id,
        name: repairStatusTypeTable.name,
        colour: repairStatusTypeTable.colour,
      },
      type: {
        id: repairTypeTable.id,
        name: repairTypeTable.name,
      },
    })
    .from(repairTable)
    .innerJoin(assetTable, eq(repairTable.assetId, assetTable.id))
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

export async function getRepairsCount(
  { globalFilter, columnFilters }: GetCountInput,
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
        isNull(repairTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.value;
}

export async function getRepairsSelect(_: GetSelectInput) {
  const query = db
    .select({
      value: repairTable.id,
      label: repairTable.fault,
    })
    .from(repairTable)
    .where(isNull(repairTable.deletedAt));
  return query.execute();
}

export async function getRepairsById(input: RepairID) {
  const query = db
    .select({
      ...repairFields,
      asset: {
        ...assetFields,
      },
      model: {
        id: modelTable.id,
        name: modelTable.name,
        imageUrl: modelImageTable.url,
      },
      location: {
        id: locationTable.id,
        name: locationTable.name,
      },
      manufacturer: {
        id: manufacturerTable.id,
        name: manufacturerTable.name,
      },
      type: {
        id: repairTypeTable.id,
        name: repairTypeTable.name,
      },
      status: {
        id: repairStatusTypeTable.id,
        name: repairStatusTypeTable.name,
        colour: repairStatusTypeTable.colour,
      },
    })
    .from(repairTable)
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
    .where(eq(repairTable.id, input));

  const [res] = await query.execute();
  return res;
}

export async function createRepair(input: CreateRepair) {
  const query = db.insert(repairTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepair(input: UpdateRepair) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(eq(repairTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepair({ id, ...input }: ArchiveRepair) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(eq(repairTable.id, id))
    .returning();
  const [res] = await query.execute();
  return res;
}
