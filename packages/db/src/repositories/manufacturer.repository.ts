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
} from "../mappings/manufacturers.mapper";
import {
  type ManufacturerInput,
  manufacturerTable,
} from "../tables/manufacturer.table";

const manufacturerFields = getTableColumns(manufacturerTable);
export default class ManufacturerRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<ManufacturerInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(manufacturerTable)
      .set(input)
      .where(
        and(
          eq(manufacturerTable.localId, localId),
          eq(manufacturerTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }

  async count(
    tx: DatabaseTransaction,
    { globalFilter, columnFilters }: CountInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);

    const query = tx
      .select({ count: count() })
      .from(manufacturerTable)
      .where(
        and(
          isNull(manufacturerTable.deletedAt),
          eq(manufacturerTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<ManufacturerInput>) {
    const query = tx.insert(manufacturerTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    { pagination, sorting, globalFilter, columnFilters }: GetAllInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);

    const query = tx
      .select()
      .from(manufacturerTable)
      .where(
        and(
          isNull(manufacturerTable.deletedAt),
          eq(manufacturerTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, manufacturerTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: manufacturerTable.id,
        label: manufacturerTable.name,
      })
      .from(manufacturerTable)
      .where(
        and(
          isNull(manufacturerTable.deletedAt),
          eq(manufacturerTable.organizationId, organizationId),
        ),
      );
    return query.execute();
  }

  async getByLocalId(
    tx: DatabaseTransaction,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const { metadata, createdByTable, deletedByTable, updatedByTable } =
      createMetadataFields();
    const query = tx
      .select({
        ...manufacturerFields,
        ...metadata,
      })
      .from(manufacturerTable)
      .innerJoin(
        createdByTable,
        eq(manufacturerTable.createdById, createdByTable.id),
      )
      .leftJoin(
        updatedByTable,
        eq(manufacturerTable.updatedById, updatedByTable.id),
      )
      .leftJoin(
        deletedByTable,
        eq(manufacturerTable.deletedById, deletedByTable.id),
      )
      .where(
        and(
          eq(manufacturerTable.localId, localId),
          eq(manufacturerTable.organizationId, organizationId),
        ),
      );
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<ManufacturerInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(manufacturerTable)
      .set(input)
      .where(
        and(
          eq(manufacturerTable.localId, localId),
          eq(manufacturerTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }
}
