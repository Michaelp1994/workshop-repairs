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
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/locations.mapper";
import { type LocationInput, locationTable } from "../tables/location.table";

const locationFields = getTableColumns(locationTable);
export default class LocationRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<LocationInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(locationTable)
      .set(input)
      .where(
        and(
          eq(locationTable.localId, localId),
          eq(locationTable.organizationId, organizationId),
        ),
      )
      .returning();
    const [res] = await query.execute();
    return res;
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
      .from(locationTable)
      .where(
        and(
          isNull(locationTable.deletedAt),
          eq(locationTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<LocationInput>) {
    const query = tx.insert(locationTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAll(
    tx: DatabaseTransaction,
    { pagination, globalFilter, sorting, columnFilters }: GetAllInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);
    const query = tx
      .select()
      .from(locationTable)
      .where(
        and(
          isNull(locationTable.deletedAt),
          eq(locationTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, locationTable.id)
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
        value: locationTable.id,
        label: locationTable.name,
      })
      .from(locationTable)
      .where(
        and(
          isNull(locationTable.deletedAt),
          eq(locationTable.organizationId, organizationId),
        ),
      )
      .orderBy(locationTable.name);
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
        ...locationFields,
        ...metadata,
      })
      .from(locationTable)
      .innerJoin(
        createdByTable,
        eq(locationTable.createdById, createdByTable.id),
      )
      .leftJoin(
        updatedByTable,
        eq(locationTable.updatedById, updatedByTable.id),
      )
      .leftJoin(
        deletedByTable,
        eq(locationTable.deletedById, deletedByTable.id),
      )
      .where(
        and(
          eq(locationTable.localId, localId),
          eq(locationTable.organizationId, organizationId),
        ),
      );
    const [res] = await query.execute();
    return res;
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<LocationInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(locationTable)
      .set(input)
      .where(
        and(
          eq(locationTable.localId, localId),
          eq(locationTable.organizationId, organizationId),
        ),
      )
      .returning();
    const [res] = await query.execute();
    return res;
  }
}
