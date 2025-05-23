import assert from "assert";
import { eq, getTableColumns } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  type CreateUserOnboarding,
  type UpdateUserOnboarding,
  userOnboardingTable,
} from "../tables/user-onboarding.sql";
import { type UserID, userTable } from "../tables/user.sql";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);
const userOnboardingColumns = getTableColumns(userOnboardingTable);

export async function getUserOnboardingByUserId(userId: UserID) {
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

export async function createUserOnboarding(input: CreateUserOnboarding) {
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

export async function updateUserOnboardingByUserId(
  input: UpdateUserOnboarding,
) {
  const query = db
    .update(userOnboardingTable)
    .set(input)
    .where(eq(userOnboardingTable.userId, input.userId))
    .returning();
  const [res] = await query.execute();
  return res;
}
