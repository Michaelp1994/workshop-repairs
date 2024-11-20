import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  type ArchiveEquipmentType,
  type CreateEquipmentType,
  type EquipmentTypeID,
  equipmentTypeTable,
  type UpdateEquipmentType,
} from "../tables/equipment-type.sql";

export function getAll(
  { pagination }: GetAllInput,
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

export async function getCount(
  _: GetCountInput,
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

export async function getSelect(
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

export async function getById(input: EquipmentTypeID) {
  const query = db
    .select()
    .from(equipmentTypeTable)
    .where(eq(equipmentTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateEquipmentType) {
  const query = db.insert(equipmentTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateEquipmentType) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveEquipmentType) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
