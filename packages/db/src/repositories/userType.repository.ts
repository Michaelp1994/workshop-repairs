import type {
  CountUserTypesInput,
  GetAllUserTypesInput,
  GetUserTypeSelectInput,
} from "@repo/validators/server/userTypes.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "..";
import {
  type ArchiveUserType,
  type CreateUserType,
  type UpdateUserType,
  type UserTypeID,
  userTypeTable,
} from "../tables/user-type.sql";

export async function archiveUserType(input: ArchiveUserType) {
  const query = db
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function countUserTypes(_: CountUserTypesInput) {
  const query = db
    .select({ count: count() })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function createUserType(input: CreateUserType) {
  const query = db.insert(userTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export function getAllUserTypes({ pagination }: GetAllUserTypesInput) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt))
    .orderBy(userTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getUserTypeById(input: UserTypeID) {
  const query = db
    .select()
    .from(userTypeTable)
    .where(eq(userTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getUserTypesSelect(_: GetUserTypeSelectInput) {
  const query = db
    .select({
      value: userTypeTable.id,
      label: userTypeTable.name,
    })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  return query.execute();
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
