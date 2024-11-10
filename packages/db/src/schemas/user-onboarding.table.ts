import { boolean, integer, pgTable, serial } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { userTable } from "./user.table";

export const userOnboardingTable = pgTable("user_onboarding", {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .unique()
    .references(() => userTable.id),
  organizationCreated: boolean().default(false),
  invitedUsers: boolean().default(false),
});

export type UserOnboarding = InferModel<typeof userOnboardingTable>;
export type UserOnboardingID = UserOnboarding["id"];
export type CreateUserOnboarding = InferCreateModel<typeof userOnboardingTable>;
export type UpdateUserOnboarding = InferUpdateModel<typeof userOnboardingTable>;
export type ArchiveUserOnboarding = InferArchiveModel<
  typeof userOnboardingTable
>;
