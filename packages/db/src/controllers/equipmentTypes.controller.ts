import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.schema";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  type ArchiveEquipmentType,
  type CreateEquipmentType,
  type EquipmentTypeID,
  equipmentTypes,
  type UpdateEquipmentType,
} from "../schemas/equipment-types.schema";

export function getAll({ pagination }: GetAll, organizationId: OrganizationID) {
  const query = db
    .select()
    .from(equipmentTypes)
    .where(
      and(
        isNull(equipmentTypes.deletedAt),
        eq(equipmentTypes.organizationId, organizationId),
      ),
    )
    .orderBy(equipmentTypes.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, organizationId: OrganizationID) {
  const query = db
    .select({ count: count() })
    .from(equipmentTypes)
    .where(
      and(
        isNull(equipmentTypes.deletedAt),
        eq(equipmentTypes.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelect, organizationId: OrganizationID) {
  const query = db
    .select({
      value: equipmentTypes.id,
      label: equipmentTypes.name,
    })
    .from(equipmentTypes)
    .where(
      and(
        isNull(equipmentTypes.deletedAt),
        eq(equipmentTypes.organizationId, organizationId),
      ),
    );
  return query.execute();
}

export async function getById(input: EquipmentTypeID, db: Database) {
  const query = db
    .select()
    .from(equipmentTypes)
    .where(eq(equipmentTypes.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateEquipmentType, db: Database) {
  const query = db.insert(equipmentTypes).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateEquipmentType, db: Database) {
  const query = db
    .update(equipmentTypes)
    .set(input)
    .where(eq(equipmentTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveEquipmentType, db: Database) {
  const query = db
    .update(equipmentTypes)
    .set(input)
    .where(eq(equipmentTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
