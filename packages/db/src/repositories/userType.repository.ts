import type {
  CountUserTypesInput,
  GetAllUserTypesInput,
  GetUserTypeSelectInput,
} from "@repo/validators/server/userTypes.validators";

import { count, eq, isNull } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type UserTypeID,
  type UserTypeInput,
  userTypeTable,
} from "../tables/user-type.sql";

export async function archiveUserType(
  tx: DatabaseTransaction,
  input: ArchiveInput<UserTypeInput>,
  userTypeId: UserTypeID,
) {
  const query = tx
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, userTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function countUserTypes(
  tx: DatabaseTransaction,
  _: CountUserTypesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function createUserType(
  tx: DatabaseTransaction,
  input: CreateInput<UserTypeInput>,
) {
  const query = tx.insert(userTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export function getAllUserTypes(
  tx: DatabaseTransaction,
  { pagination }: GetAllUserTypesInput,
) {
  const query = tx
    .select()
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt))
    .orderBy(userTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getUserTypeById(
  tx: DatabaseTransaction,
  input: UserTypeID,
) {
  const query = tx
    .select()
    .from(userTypeTable)
    .where(eq(userTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getUserTypesSelect(
  tx: DatabaseTransaction,
  _: GetUserTypeSelectInput,
) {
  const query = tx
    .select({
      value: userTypeTable.id,
      label: userTypeTable.name,
    })
    .from(userTypeTable)
    .where(isNull(userTypeTable.deletedAt));
  return query.execute();
}

export async function updateUserType(
  tx: DatabaseTransaction,
  input: UpdateInput<UserTypeInput>,
  userTypeId: UserTypeID,
) {
  const query = tx
    .update(userTypeTable)
    .set(input)
    .where(eq(userTypeTable.id, userTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}
