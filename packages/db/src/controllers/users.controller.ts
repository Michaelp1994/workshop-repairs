import { and, count, eq, isNull } from "drizzle-orm";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
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
  db: Database,
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
      and(isNull(users.deletedAt), globalFilterParams, ...columnFilterParams),
    )
    .orderBy(...orderByParams, users.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(
  { globalFilter, columnFilters }: GetCount,
  db: Database,
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
      and(isNull(users.deletedAt), globalFilterParams, ...columnFilterParams),
    );
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: UserID, db: Database) {
  const query = db.select().from(users).where(eq(users.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getByEmail(input: string, db: Database) {
  const query = db.select().from(users).where(eq(users.email, input));
  const [res] = await query.execute();
  return res;
}

export async function getByLoginDetails(
  { email, password }: { email: string; password: string },
  db: Database,
) {
  const query = db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUser, db: Database) {
  const query = db.insert(users).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUser, db: Database) {
  const query = db
    .update(users)
    .set(input)
    .where(eq(users.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUser, db: Database) {
  const query = db
    .update(users)
    .set(input)
    .where(eq(users.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
