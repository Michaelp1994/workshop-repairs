import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const userOnboardings = pgTable("user_onboardings", {
  id: serial().primaryKey(),
  userId: varchar().notNull().unique(),
  organizationCreated: boolean().default(false),
  invitedUsers: boolean().default(false),
});

export type UserOnboarding = InferModel<typeof userOnboardings>;
export type UserOnboardingID = UserOnboarding["id"];
export type CreateUserOnboarding = InferCreateModel<typeof userOnboardings>;
export type UpdateUserOnboarding = InferUpdateModel<typeof userOnboardings>;
export type ArchiveUserOnboarding = InferArchiveModel<typeof userOnboardings>;
