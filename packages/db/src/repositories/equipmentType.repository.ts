import type {
  DataTableCountSchema,
  DataTableInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
import { db } from "../index";
import {
  type ArchiveEquipmentType,
  type CreateEquipmentType,
  type EquipmentTypeID,
  equipmentTypeTable,
  type UpdateEquipmentType,
} from "../tables/equipment-type.sql";

const equipmentTypeFields = getTableColumns(equipmentTypeTable);

export function getAllEquipmentTypes(
  { pagination }: DataTableInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select()
    .from(equipmentTypeTable)
    .where(
      and(
        isNull(equipmentTypeTable.deletedAt),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    )
    .orderBy(equipmentTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getEquipmentTypesCount(
  _: DataTableCountSchema,
  organizationId: OrganizationID,
) {
  const query = db
    .select({ count: count() })
    .from(equipmentTypeTable)
    .where(
      and(
        isNull(equipmentTypeTable.deletedAt),
        eq(equipmentTypeTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getEquipmentTypesSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
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

export async function getEquipmentTypeById(input: EquipmentTypeID) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = db
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

export async function createEquipmentType(input: CreateEquipmentType) {
  const query = db.insert(equipmentTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateEquipmentType(input: UpdateEquipmentType) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveEquipmentType(input: ArchiveEquipmentType) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
