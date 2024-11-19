import { count, eq, isNull } from "drizzle-orm";

import { db } from "..";
import { type GetAll, type GetCount } from "../helpers/types";
import {
  type ArchiveUserType,
  type CreateUserType,
  type UpdateUserType,
  type UserTypeID,
  userTypeTable,
} from "../schemas/user-type.table";

export function getAll({ pagination }: GetAll) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt))
    .orderBy(userTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount) {
  const query = db
    .select({ count: count() })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: UserTypeID) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(eq(userTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUserType) {
  const query = db.insert(userTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUserType) {
  const query = db
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUserType) {
  const query = db
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
