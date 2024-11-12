import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveRepairStatusType,
  type CreateRepairStatusType,
  type RepairStatusTypeID,
  repairStatusTypeTable,
  type UpdateRepairStatusType,
} from "../schemas/repair-status-type.table";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelect, db: Database) {
  const query = db
    .select({
      value: repairStatusTypeTable.id,
      label: repairStatusTypeTable.name,
    })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id);
  return query.execute();
}

export async function getById(input: RepairStatusTypeID, db: Database) {
  const query = db
    .select()
    .from(repairStatusTypeTable)
    .where(eq(repairStatusTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairStatusType, db: Database) {
  const query = db.insert(repairStatusTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairStatusType, db: Database) {
  const query = db
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairStatusType, db: Database) {
  const query = db
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
