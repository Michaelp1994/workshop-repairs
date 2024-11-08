import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  repairFilterMapping,
  repairOrderMapping,
} from "../mappings/repairs.mappings";
import { assetTable } from "../schemas/asset.table";
import { locationTable } from "../schemas/location.table";
import { manufacturerTable } from "../schemas/manufacturer.table";
import { modelImageTable } from "../schemas/model-image.table";
import { modelTable } from "../schemas/model.table";
import { repairStatusTypeTable } from "../schemas/repair-status-type.table";
import { repairTypeTable } from "../schemas/repair-type.table";
import {
  type ArchiveRepair,
  type CreateRepair,
  type RepairID,
  repairTable,
  type UpdateRepair,
} from "../schemas/repair.table";

const repairFields = getTableColumns(repairTable);
const assetFields = getTableColumns(assetTable);

const globalFilterColumns = [
  repairTable.fault,
  repairTable.summary,
  repairStatusTypeTable.name,
  repairTypeTable.name,
  assetTable.assetNumber,
  assetTable.serialNumber,
  repairTable.clientReference,
];

export function getAll(
  { globalFilter, sorting, pagination, columnFilters }: GetAll,
  organizationId: OrganizationID,
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

export async function getCount(
  { globalFilter, columnFilters }: GetCount,
  organizationId: OrganizationID,
) {
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

export async function getSelect(_: GetSelect, db: Database) {
  const query = db
    .select({
      value: repairTable.id,
      label: repairTable.fault,
    })
    .from(repairTable)
    .where(isNull(repairTable.deletedAt));
  return query.execute();
}

export async function getById(input: RepairID, db: Database) {
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

export async function create(input: CreateRepair, db: Database) {
  const query = db.insert(repairTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepair, db: Database) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(eq(repairTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive({ id, ...input }: ArchiveRepair, db: Database) {
  const query = db
    .update(repairTable)
    .set(input)
    .where(eq(repairTable.id, id))
    .returning();
  const [res] = await query.execute();
  return res;
}
