import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/repairParts.mapper";
import { assetTable } from "../tables/asset.table";
import { partTable } from "../tables/part.table";
import { repairTable } from "../tables/repair.table";
import {
  type RepairPartID,
  type RepairPartInput,
  repairPartTable,
} from "../tables/repairPart.table";
import { returnOne } from "../helpers/executeQuery";

const repairPartFields = getTableColumns(repairPartTable);

interface RepairPartFilters {
  repairId?: number | undefined;
}
export default class RepairPartRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairPartInput>,
    repairPartId: RepairPartID,
  ) {
    const query = tx
      .update(repairPartTable)
      .set(input)
      .where(eq(repairPartTable.id, repairPartId))
      .returning();
    return await returnOne(query);
  }

  async count(
    tx: DatabaseTransaction,
    { filters, columnFilters, globalFilter }: CountInput<RepairPartFilters>,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({ count: count() })
      .from(repairPartTable)
      .innerJoin(partTable, eq(partTable.id, repairPartTable.partId))
      .where(
        and(
          isNull(repairPartTable.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
          filters.repairId
            ? eq(repairPartTable.repairId, filters.repairId)
            : undefined,
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<RepairPartInput>) {
    const query = tx.insert(repairPartTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    {
      pagination,
      filters,
      columnFilters,
      globalFilter,
      sorting,
    }: GetAllInput<RepairPartFilters>,
  ) {
    const orderByParams = getOrderBy(sorting);
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const { createdByTable, deletedByTable, metadata, updatedByTable } =
      createMetadataFields();
    const query = tx
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
      .leftJoin(
        deletedByTable,
        eq(deletedByTable.deletedById, deletedByTable.id),
      )
      .where(
        and(
          isNull(repairPartTable.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
          filters.repairId
            ? eq(repairPartTable.repairId, filters.repairId)
            : undefined,
        ),
      )
      .orderBy(...orderByParams, repairPartTable.createdAt)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getById(tx: DatabaseTransaction, input: RepairPartID) {
    const query = tx
      .select({
        ...repairPartFields,
        assets: assetTable,
      })
      .from(repairPartTable)
      .innerJoin(repairTable, eq(repairTable.id, repairPartTable.repairId))
      .innerJoin(assetTable, eq(assetTable.id, repairTable.assetId))
      .where(eq(repairPartTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairPartInput>,
    repairPartId: RepairPartID,
  ) {
    const query = tx
      .update(repairPartTable)
      .set(input)
      .where(eq(repairPartTable.id, repairPartId))
      .returning();
    return await returnOne(query);
  }
}
