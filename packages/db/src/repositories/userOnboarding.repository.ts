import { eq, getTableColumns } from "drizzle-orm";

import type { CreateInput, UpdateInput } from "../types";

import { returnOne } from "../helpers/executeQuery";
import { type DatabaseTransaction } from "../index";
import { type UserID, userTable } from "../tables/user.table";
import {
  type UserOnboardingInput,
  userOnboardingTable,
} from "../tables/userOnboarding.table";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);
const userOnboardingColumns = getTableColumns(userOnboardingTable);

export default class UserOnboardingRepository {
  async create(
    tx: DatabaseTransaction,
    input: CreateInput<UserOnboardingInput>,
  ) {
    const query = tx.insert(userOnboardingTable).values(input).returning();
    return await returnOne(query);
  }

  async getByUserId(tx: DatabaseTransaction, userId: UserID) {
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
    return await returnOne(query);
  }

  async updateByUserId(
    tx: DatabaseTransaction,
    input: UpdateInput<UserOnboardingInput>,
    userId: UserID,
  ) {
    const query = tx
      .update(userOnboardingTable)
      .set(input)
      .where(eq(userOnboardingTable.userId, userId))
      .returning();
    return await returnOne(query);
  }
}
