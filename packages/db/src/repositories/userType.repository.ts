import type {
  GetAllInput,
  GetCountInput,
} from "@repo/validators/dataTables.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "..";
import {
  type ArchiveUserType,
  type CreateUserType,
  type UpdateUserType,
  type UserTypeID,
  userTypeTable,
} from "../tables/user-type.sql";

export function getAllUserTypes({ pagination }: GetAllInput) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt))
    .orderBy(userTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getUserTypesCount(_: GetCountInput) {
  const query = db
    .select({ count: count() })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getUserTypeById(input: UserTypeID) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(eq(userTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createUserType(input: CreateUserType) {
  const query = db.insert(userTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateUserType(input: UpdateUserType) {
  const query = db
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveUserType(input: ArchiveUserType) {
  const query = db
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
