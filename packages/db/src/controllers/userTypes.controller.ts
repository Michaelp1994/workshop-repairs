import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveUserType,
  type CreateUserType,
  type UpdateUserType,
  type UserTypeID,
  userTypes,
} from "../schemas/user-types.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(userTypes)
    .where(isNull(userTypes.deletedAt))
    .orderBy(userTypes.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(userTypes)
    .where(isNull(userTypes.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: UserTypeID, db: Database) {
  const query = db.select().from(userTypes).where(eq(userTypes.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUserType, db: Database) {
  const query = db.insert(userTypes).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUserType, db: Database) {
  const query = db
    .update(userTypes)
    .set(input)
    .where(eq(userTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUserType, db: Database) {
  const query = db
    .update(userTypes)
    .set(input)
    .where(eq(userTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
