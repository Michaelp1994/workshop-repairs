import assert from "assert";
import { eq, getTableColumns } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type UserOnboardingInput,
  userOnboardingTable,
} from "../tables/user-onboarding.sql";
import { type UserID, userTable } from "../tables/user.sql";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);
const userOnboardingColumns = getTableColumns(userOnboardingTable);

export async function getUserOnboardingByUserId(
  tx: DatabaseTransaction,
  userId: UserID,
) {
  const query = tx
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

export async function createUserOnboarding(
  tx: DatabaseTransaction,
  input: CreateInput<UserOnboardingInput>,
) {
  const query = tx.insert(userOnboardingTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function setOrganization(
  tx: DatabaseTransaction,
  userId: UserID,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(userTable)
    .set({
      organizationId,
    })
    .where(eq(userTable.id, userId))
    .returning({ ...publicUserColumns });

  const [res] = await query.execute();

  return res;
}

export async function setInvitations(tx: DatabaseTransaction, userId: UserID) {
  const query = tx
    .update(userOnboardingTable)
    .set({
      invitedUsers: true,
    })
    .where(eq(userOnboardingTable.userId, userId))
    .returning();
  const [res] = await query.execute();
  assert(res, "User not found");
  const query2 = tx
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
  tx: DatabaseTransaction,
  input: UpdateInput<UserOnboardingInput>,
) {
  const query = tx
    .update(userOnboardingTable)
    .set(input)
    .where(eq(userOnboardingTable.userId, input.userId))
    .returning();
  const [res] = await query.execute();
  return res;
}
