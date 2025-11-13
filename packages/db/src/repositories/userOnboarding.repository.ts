import { eq, getTableColumns } from "drizzle-orm";

import type { CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type UserOnboardingInput,
  userOnboardingTable,
} from "../tables/user-onboarding.sql";
import { type UserID, userTable } from "../tables/user.sql";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);
const userOnboardingColumns = getTableColumns(userOnboardingTable);

export default class UserOnboardingRepository {
  async createUserOnboarding(
    tx: DatabaseTransaction,
    input: CreateInput<UserOnboardingInput>,
  ) {
    const query = tx.insert(userOnboardingTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getUserOnboardingByUserId(tx: DatabaseTransaction, userId: UserID) {
    const query = tx
      .select({
        ...publicUserColumns,
        onboarding: userOnboardingColumns,
      })
      .from(userTable)
      .leftJoin(
        userOnboardingTable,
        eq(userTable.id, userOnboardingTable.userId),
      )
      .where(eq(userTable.id, userId));
    const [res] = await query.execute();
    return res;
  }

  async updateUserOnboardingByUserId(
    tx: DatabaseTransaction,
    input: UpdateInput<UserOnboardingInput>,
    userId: UserID,
  ) {
    const query = tx
      .update(userOnboardingTable)
      .set(input)
      .where(eq(userOnboardingTable.userId, userId))
      .returning();
    const [res] = await query.execute();
    return res;
  }
}
