import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveEquipmentType,
  type CreateEquipmentType,
  type EquipmentTypeID,
  equipmentTypes,
  type UpdateEquipmentType,
} from "../schemas/equipment-types.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(equipmentTypes)
    .where(isNull(equipmentTypes.deletedAt))
    .orderBy(equipmentTypes.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(equipmentTypes)
    .where(isNull(equipmentTypes.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelect, db: Database) {
  const query = db
    .select({
      value: equipmentTypes.id,
      label: equipmentTypes.name,
    })
    .from(equipmentTypes)
    .where(isNull(equipmentTypes.deletedAt));
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
