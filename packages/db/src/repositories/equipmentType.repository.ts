import type {
  CountEquipmentTypesInput,
  GetAllEquipmentTypesInput,
  GetEquipmentTypesSelectInput,
} from "@repo/validators/server/equipmentTypes.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  createGlobalFilters,
  createSortOrder,
} from "../mappings/equipmentType.mapper";
import {
  type EquipmentTypeID,
  type EquipmentTypeInput,
  equipmentTypeTable,
} from "../tables/equipment-type.sql";

const equipmentTypeFields = getTableColumns(equipmentTypeTable);

export function getAllEquipmentTypes(
  tx: DatabaseTransaction,
  { pagination, globalFilter, sorting }: GetAllEquipmentTypesInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = createGlobalFilters(globalFilter);
  const orderByParams = createSortOrder(sorting);
  const query = tx
    .select()
    .from(equipmentTypeTable)
    .where(
      and(
        globalFilterParams,
        isNull(equipmentTypeTable.deletedAt),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    )
    .orderBy(...orderByParams, equipmentTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countEquipmentTypes(
  tx: DatabaseTransaction,
  { globalFilter }: CountEquipmentTypesInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = createGlobalFilters(globalFilter);
  const query = tx
    .select({ count: count() })
    .from(equipmentTypeTable)
    .where(
      and(
        globalFilterParams,
        isNull(equipmentTypeTable.deletedAt),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getEquipmentTypesSelect(
  tx: DatabaseTransaction,
  _: GetEquipmentTypesSelectInput,
  organizationId: OrganizationID,
) {
  const query = tx
    .select({
      value: equipmentTypeTable.id,
      label: equipmentTypeTable.name,
    })
    .from(equipmentTypeTable)
    .where(
      and(
        isNull(equipmentTypeTable.deletedAt),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    );
  return query.execute();
}

export async function getEquipmentTypeByLocalId(
  tx: DatabaseTransaction,
  localId: number,
  organizationId: OrganizationID,
) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = tx
    .select({
      ...equipmentTypeFields,
      ...metadata,
    })
    .from(equipmentTypeTable)
    .innerJoin(
      createdByTable,
      eq(equipmentTypeTable.createdById, createdByTable.id),
    )
    .leftJoin(
      updatedByTable,
      eq(equipmentTypeTable.updatedById, updatedByTable.id),
    )
    .leftJoin(
      deletedByTable,
      eq(equipmentTypeTable.deletedById, deletedByTable.id),
    )
    .where(
      and(
        eq(equipmentTypeTable.localId, localId),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function getEquipmentTypeById(
  tx: DatabaseTransaction,
  input: EquipmentTypeID,
) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = tx
    .select({
      ...equipmentTypeFields,
      ...metadata,
    })
    .from(equipmentTypeTable)
    .innerJoin(
      createdByTable,
      eq(equipmentTypeTable.createdById, createdByTable.id),
    )
    .leftJoin(
      updatedByTable,
      eq(equipmentTypeTable.updatedById, updatedByTable.id),
    )
    .leftJoin(
      deletedByTable,
      eq(equipmentTypeTable.deletedById, deletedByTable.id),
    )
    .where(eq(equipmentTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createEquipmentType(
  tx: DatabaseTransaction,
  input: CreateInput<EquipmentTypeInput>,
) {
  const query = tx.insert(equipmentTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateEquipmentType(
  tx: DatabaseTransaction,
  input: UpdateInput<EquipmentTypeInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(equipmentTypeTable)
    .set(input)
    .where(
      and(
        eq(equipmentTypeTable.localId, localId),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveEquipmentType(
  tx: DatabaseTransaction,
  input: ArchiveInput<EquipmentTypeInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(equipmentTypeTable)
    .set(input)
    .where(
      and(
        eq(equipmentTypeTable.localId, localId),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
