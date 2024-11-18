import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount } from "../helpers/types";
import { db } from "../index";
import {
  userFilterMapping,
  userOrderMapping,
} from "../mappings/users.mappings";
import {
  type ArchiveUser,
  type CreateUser,
  type UpdateUser,
  type UserID,
  userTable,
} from "../schemas/user.table";
import { userTypeTable } from "../schemas/user-type.table";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);

const globalFilterColumns = [userTable.firstName, userTable.email];

export function getAll(
  { globalFilter, sorting, pagination, columnFilters }: GetAll,
  organizationId: OrganizationID,
) {
  const orderByParams = getOrderByParams(sorting, userOrderMapping);
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    userFilterMapping,
  );
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

export async function getCount(
  { globalFilter, columnFilters }: GetCount,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    userFilterMapping,
  );
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

export async function getById(input: UserID) {
  const query = db
    .select({ ...publicUserColumns })
    .from(userTable)
    .where(eq(userTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getByEmail(input: string) {
  const query = db.select().from(userTable).where(eq(userTable.email, input));
  const [res] = await query.execute();
  return res;
}

export async function setEmailVerified(input: UserID) {
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

export async function create(input: CreateUser) {
  const query = db
    .insert(userTable)
    .values(input)
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUser) {
  const query = db
    .update(userTable)
    .set(input)
    .where(eq(userTable.id, input.id))
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUser) {
  const query = db
    .update(userTable)
    .set(input)
    .where(eq(userTable.id, input.id))
    .returning({ ...publicUserColumns });
  const [res] = await query.execute();
  return res;
}
