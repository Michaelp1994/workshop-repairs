import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  type ArchiveEquipmentType,
  type CreateEquipmentType,
  type EquipmentTypeID,
  equipmentTypeTable,
  type UpdateEquipmentType,
} from "../schemas/equipment-type.table";

export function getAll({ pagination }: GetAll, organizationId: OrganizationID) {
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

export async function getCount(_: GetCount, organizationId: OrganizationID) {
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

export async function getSelect(_: GetSelect, organizationId: OrganizationID) {
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

export async function getById(input: EquipmentTypeID, db: Database) {
  const query = db
    .select()
    .from(equipmentTypeTable)
    .where(eq(equipmentTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateEquipmentType, db: Database) {
  const query = db.insert(equipmentTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateEquipmentType, db: Database) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveEquipmentType, db: Database) {
  const query = db
    .update(equipmentTypeTable)
    .set(input)
    .where(eq(equipmentTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
