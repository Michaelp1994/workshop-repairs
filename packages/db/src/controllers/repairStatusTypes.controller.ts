import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveRepairStatusType,
  type CreateRepairStatusType,
  type RepairStatusTypeID,
  repairStatusTypes,
  type UpdateRepairStatusType,
} from "../schemas/repair-status-types.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairStatusTypes)
    .where(isNull(repairStatusTypes.deletedAt))
    .orderBy(repairStatusTypes.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairStatusTypes)
    .where(isNull(repairStatusTypes.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelect, db: Database) {
  const query = db
    .select({
      value: repairStatusTypes.id,
      label: repairStatusTypes.name,
    })
    .from(repairStatusTypes)
    .where(isNull(repairStatusTypes.deletedAt))
    .orderBy(repairStatusTypes.id);
  return query.execute();
}

export async function getById(input: RepairStatusTypeID, db: Database) {
  const query = db
    .select()
    .from(repairStatusTypes)
    .where(eq(repairStatusTypes.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairStatusType, db: Database) {
  const query = db.insert(repairStatusTypes).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairStatusType, db: Database) {
  const query = db
    .update(repairStatusTypes)
    .set(input)
    .where(eq(repairStatusTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairStatusType, db: Database) {
  const query = db
    .update(repairStatusTypes)
    .set(input)
    .where(eq(repairStatusTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
