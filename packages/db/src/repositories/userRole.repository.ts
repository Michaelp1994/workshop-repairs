import type {
  CountUserRolesInput,
  GetAllUserRolesInput,
  GetUserRoleSelectInput,
} from "@repo/validators/server/userRoles.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "..";
import {
  type ArchiveUserRole,
  type CreateUserRole,
  type UpdateUserRole,
  type UserRoleID,
  userRoleTable,
} from "../tables/user-role.sql";

export async function archiveUserRole(input: ArchiveUserRole) {
  const query = db
    .update(userRoleTable)
    .set(input)
    .where(eq(userRoleTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function countUserRoles(_: CountUserRolesInput) {
  const query = db
    .select({ count: count() })
    .from(userRoleTable)
    .where(isNull(userRoleTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function createUserRole(input: CreateUserRole) {
  const query = db.insert(userRoleTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export function getAllUserRoles({ pagination }: GetAllUserRolesInput) {
  const query = db
    .select()
    .from(userRoleTable)
    .where(isNull(userRoleTable.deletedAt))
    .orderBy(userRoleTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getUserRoleById(input: UserRoleID) {
  const query = db
    .select()
    .from(userRoleTable)
    .where(eq(userRoleTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getUserRolesSelect(_: GetUserRoleSelectInput) {
  const query = db
    .select({
      value: userRoleTable.id,
      label: userRoleTable.name,
    })
    .from(userRoleTable)
    .where(isNull(userRoleTable.deletedAt));
  return query.execute();
}

export async function updateUserRole(input: UpdateUserRole) {
  const query = db
    .update(userRoleTable)
    .set(input)
    .where(eq(userRoleTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
