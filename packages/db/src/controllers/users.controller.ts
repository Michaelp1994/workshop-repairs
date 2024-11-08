import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organizations.schema";

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
  users,
} from "../schemas/users.schema";

const globalFilterColumns = [users.firstName, users.email];

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
    .select()
    .from(users)
    .where(
      and(
        isNull(users.deletedAt),
        eq(users.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, users.id)
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
    .from(users)
    .where(
      and(
        isNull(users.deletedAt),
        eq(users.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: UserID) {
  const query = db.select().from(users).where(eq(users.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getByEmail(input: string) {
  const query = db.select().from(users).where(eq(users.email, input));
  const [res] = await query.execute();
  return res;
}

export async function confirmEmailVerified(input: UserID) {
  const query = db
    .update(users)
    .set({
      emailVerified: true,
    })
    .where(eq(users.id, input))
    .returning();

  const [res] = await query.execute();
  return res;
}

export async function setOrganization(
  userId: UserID,
  organizationId: OrganizationID,
) {
  const query = db
    .update(users)
    .set({
      organizationId,
    })
    .where(eq(users.id, userId))
    .returning();

  const [res] = await query.execute();
  return res;
}

export async function getByLoginDetails(email: string) {
  const query = db
    .select()
    .from(users)
    .where(and(eq(users.email, email)));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUser) {
  const query = db.insert(users).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUser) {
  const query = db
    .update(users)
    .set(input)
    .where(eq(users.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUser) {
  const query = db
    .update(users)
    .set(input)
    .where(eq(users.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
