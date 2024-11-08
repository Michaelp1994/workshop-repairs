import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const userOnboardingTable = pgTable("user_onboarding", {
  id: serial().primaryKey(),
  userId: varchar().notNull().unique(),
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
