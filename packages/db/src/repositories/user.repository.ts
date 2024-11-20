import type {
  DataTableInput,
  DataTableCountSchema,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/users.mapper";
import {
  type ArchiveUser,
  type CreateUser,
  type UpdateUser,
  type UserID,
  userTable,
} from "../tables/user.sql";
import { userTypeTable } from "../tables/user-type.sql";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);

export function getAllUsers(
  { globalFilter, sorting, pagination, columnFilters }: DataTableInput,
  organizationId: OrganizationID,
) {
  const orderByParams = getOrderBy(sorting);
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({ ...publicUserColumns, type: userTypeTable })
    .from(userTable)
    .innerJoin(userTypeTable, eq(userTypeTable.id, userTable.typeId))
    .where(
      and(
        isNull(userTable.deletedAt),
        eq(userTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, userTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getUsersCount(
  { globalFilter, columnFilters }: DataTableCountSchema,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({ count: count() })
    .from(userTable)
    .where(
      and(
        isNull(userTable.deletedAt),
        eq(userTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getUserById(input: UserID) {
  const query = db
    .select({ ...publicUserColumns, type: userTypeTable })
    .from(userTable)
    .innerJoin(userTypeTable, eq(userTypeTable.id, userTable.typeId))
    .where(eq(userTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getUserByEmail(input: string) {
  const query = db.select().from(userTable).where(eq(userTable.email, input));
  const [res] = await query.execute();
  return res;
}

export async function setUserEmailVerified(input: UserID) {
  const query = db
    .update(userTable)
    .set({
      emailVerified: true,
    })
    .where(eq(userTable.id, input))
    .returning({ ...publicUserColumns });

  const [res] = await query.execute();
  return res;
}

export async function createUser(input: CreateUser) {
  const query = db
    .insert(userTable)
    .values(input)
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}

export async function updateUser(input: UpdateUser) {
  const query = db
    .update(userTable)
    .set(input)
    .where(eq(userTable.id, input.id))
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}

export async function archiveUser(input: ArchiveUser) {
  const query = db
    .update(userTable)
    .set(input)
    .where(eq(userTable.id, input.id))
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}
