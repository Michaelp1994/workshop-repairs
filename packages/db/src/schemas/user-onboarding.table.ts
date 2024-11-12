import { boolean, integer, pgTable, serial } from "drizzle-orm/pg-core";

import { type InferCreateModel, type InferModel } from "../types";
import { userTable } from "./user.table";

export const userOnboardingTable = pgTable("user_onboarding", {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .unique()
    .references(() => userTable.id),
  welcomed: boolean().notNull().default(false),
  invitedUsers: boolean().notNull().default(false),
});

export type UserOnboarding = InferModel<typeof userOnboardingTable>;
export type UserOnboardingID = UserOnboarding["id"];
export type CreateUserOnboarding = InferCreateModel<typeof userOnboardingTable>;
export type UpdateUserOnboarding = CreateUserOnboarding;
