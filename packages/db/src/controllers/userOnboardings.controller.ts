import { eq } from "drizzle-orm";

import type { UserID } from "../schemas/user.table";

import { db } from "../index";
import {
  type ArchiveUserOnboarding,
  type CreateUserOnboarding,
  type UpdateUserOnboarding,
  userOnboardingTable,
} from "../schemas/user-onboarding.table";

export async function getUser(userId: UserID) {
  const query = db
    .select()
    .from(userOnboardingTable)
    .where(eq(userOnboardingTable.userId, userId));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateUserOnboarding) {
  const query = db.insert(userOnboardingTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateUserOnboarding) {
  const query = db
    .update(userOnboardingTable)
    .set(input)
    .where(eq(userOnboardingTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveUserOnboarding) {
  const query = db
    .update(userOnboardingTable)
    .set(input)
    .where(eq(userOnboardingTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
