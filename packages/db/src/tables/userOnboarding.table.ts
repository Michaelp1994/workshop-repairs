import { type InferInsertModel, relations } from "drizzle-orm";
import { boolean, integer, pgTable, unique } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { userTable } from "./user.table";

export const userOnboardingTable = pgTable(
  "user_onboarding",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .unique()
      .references(() => userTable.id),
    welcomed: boolean().notNull().default(false),
    invitedUsers: boolean().notNull().default(false),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.userId), ...auditConstraints(t)],
);

export const userOnboardingRelations = relations(
  userOnboardingTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [userOnboardingTable.userId],
      references: [userTable.id],
    }),
  }),
);

export type UserOnboarding = InferModel<typeof userOnboardingTable>;
export type UserOnboardingID = UserOnboarding["id"];
export type UserOnboardingInput = InferInsertModel<typeof userOnboardingTable>;
