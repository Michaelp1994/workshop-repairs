import type {
  CountPartsInput,
  GetAllPartsInput,
  GetPartsSelectInput,
} from "@repo/validators/server/parts.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/parts.mapper";
import { type PartInput, partTable } from "../tables/part.sql";

const partFields = getTableColumns(partTable);

export function getAllParts(
  tx: DatabaseTransaction,
  { pagination, globalFilter, sorting, columnFilters }: GetAllPartsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = tx
    .select()
    .from(partTable)
    .where(
      and(
        isNull(partTable.deletedAt),
        eq(partTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, partTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countParts(
  tx: DatabaseTransaction,
  { globalFilter, columnFilters }: CountPartsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = tx
    .select({ count: count() })
    .from(partTable)
    .where(
      and(
        isNull(partTable.deletedAt),
        eq(partTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export async function getPartsSelect(
  tx: DatabaseTransaction,
  _props: GetPartsSelectInput,
  organizationId: OrganizationID,
) {
  const query = tx
    .select({
      value: partTable.id,
      label: partTable.name,
    })
    .from(partTable)
    .where(
      and(
        isNull(partTable.deletedAt),
        eq(partTable.organizationId, organizationId),
      ),
    )
    .orderBy(partTable.id);
  const res = await query.execute();
  return res;
}

export async function getPartByLocalId(
  tx: DatabaseTransaction,
  localId: number,
  organizationId: OrganizationID,
) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = tx
    .select({
      ...partFields,
      ...metadata,
    })
    .from(partTable)
    .innerJoin(createdByTable, eq(partTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(partTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(partTable.deletedById, deletedByTable.id))
    .where(
      and(
        eq(partTable.localId, localId),
        eq(partTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function createPart(tx: DatabaseTransaction, input: CreateInput<PartInput>) {
  const query = tx.insert(partTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updatePart(
  tx: DatabaseTransaction,
  input: UpdateInput<PartInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(partTable)
    .set(input)
    .where(
      and(
        eq(partTable.localId, localId),
        eq(partTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archivePart(
  tx: DatabaseTransaction,
  input: ArchiveInput<PartInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(partTable)
    .set(input)
    .where(
      and(
        eq(partTable.localId, localId),
        eq(partTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
