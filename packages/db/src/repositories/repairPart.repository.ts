import type {
  GetAllRepairPartsInput,
  GetRepairPartsCountInput,
} from "@repo/validators/server/repairParts.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { db } from "..";
import createMetadataFields from "../helpers/createMetadataFields";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/repairParts.mapper";
import { assetTable } from "../tables/asset.sql";
import { partTable } from "../tables/part.sql";
import { repairTable } from "../tables/repair.sql";
import {
  type ArchiveRepairPart,
  type CreateRepairPart,
  type RepairPartID,
  repairPartTable,
  type UpdateRepairPart,
} from "../tables/repair-part.sql";

const repairPartFields = getTableColumns(repairPartTable);

export function getAllRepairParts({
  pagination,
  filters,
  columnFilters,
  globalFilter,
  sorting,
}: GetAllRepairPartsInput) {
  const orderByParams = getOrderBy(sorting);
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const { createdByTable, deletedByTable, metadata, updatedByTable } =
    createMetadataFields();
  const query = db
    .select({
      ...repairPartFields,
      part: partTable,
      ...metadata,
    })
    .from(repairPartTable)
    .innerJoin(partTable, eq(partTable.id, repairPartTable.partId))
    .innerJoin(
      createdByTable,
      eq(repairPartTable.createdById, createdByTable.id),
    )
    .leftJoin(
      updatedByTable,
      eq(repairPartTable.updatedById, updatedByTable.id),
    )
    .leftJoin(deletedByTable, eq(deletedByTable.deletedById, deletedByTable.id))
    .where(
      and(
        isNull(repairPartTable.deletedAt),
        globalFilterParams,
        ...columnFilterParams,
        filters?.repairId
          ? eq(repairPartTable.repairId, filters.repairId)
          : undefined,
      ),
    )
    .orderBy(...orderByParams)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countRepairParts({
  filters,
  columnFilters,
  globalFilter,
}: GetRepairPartsCountInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({ count: count() })
    .from(repairPartTable)
    .innerJoin(partTable, eq(partTable.id, repairPartTable.partId))
    .where(
      and(
        isNull(repairPartTable.deletedAt),
        globalFilterParams,
        ...columnFilterParams,
        filters?.repairId
          ? eq(repairPartTable.repairId, filters.repairId)
          : undefined,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getRepairPartById(input: RepairPartID) {
  const query = db
    .select({
      ...repairPartFields,
      assets: assetTable,
    })
    .from(repairPartTable)
    .innerJoin(repairTable, eq(repairTable.id, repairPartTable.repairId))
    .innerJoin(assetTable, eq(assetTable.id, repairTable.assetId))
    .where(eq(repairPartTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createRepairPart(input: CreateRepairPart) {
  const query = db.insert(repairPartTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairPart(input: UpdateRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairPart(input: ArchiveRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
