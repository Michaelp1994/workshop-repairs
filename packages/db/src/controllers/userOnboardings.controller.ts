import assert from "assert";
import { eq, getTableColumns } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { db } from "../index";
import { type UserID, userTable } from "../schemas/user.table";
import {
  type CreateUserOnboarding,
  type UpdateUserOnboarding,
  userOnboardingTable,
} from "../schemas/user-onboarding.table";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);
const userOnboardingColumns = getTableColumns(userOnboardingTable);

export async function getByUserId(userId: UserID) {
  const query = db
    .select({
      ...publicUserColumns,
      onboarding: userOnboardingColumns,
    })
    .from(userTable)
    .leftJoin(userOnboardingTable, eq(userTable.id, userOnboardingTable.userId))
    .where(eq(userTable.id, userId));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUserOnboarding) {
  const query = db.insert(userOnboardingTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function setOrganization(
  userId: UserID,
  organizationId: OrganizationID,
) {
  const query = db
    .update(userTable)
    .set({
      organizationId,
    })
    .where(eq(userTable.id, userId))
    .returning({ ...publicUserColumns });

  const [res] = await query.execute();

  return res;
}

export async function setInvitations(userId: UserID) {
  const query = db
    .update(userOnboardingTable)
    .set({
      invitedUsers: true,
    })
    .where(eq(userOnboardingTable.userId, userId))
    .returning();
  const [res] = await query.execute();
  assert(res, "User not found");
  const query2 = db
    .update(userTable)
    .set({
      onboardingCompleted: true,
    })
    .where(eq(userTable.id, userId))
    .returning({
      ...publicUserColumns,
    });
  const [res2] = await query2.execute();
  return res2;
}

export async function updateByUserId(input: UpdateUserOnboarding) {
  const query = db
    .update(userOnboardingTable)
    .set(input)
    .where(eq(userOnboardingTable.userId, input.userId))
    .returning();
  const [res] = await query.execute();
  return res;
}
