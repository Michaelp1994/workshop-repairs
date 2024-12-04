import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { emailVerificationRequestTable } from "./email-verification-request.sql";
import { organizationTable } from "./organization.sql";
import { userOnboardingTable } from "./user-onboarding.sql";
import { userRoleTable } from "./user-role.sql";

export const userTable = pgTable(
  "user",
  {
    id: serial().primaryKey(),
    firstName: varchar().notNull(),
    lastName: varchar().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar().notNull(),
    roleId: integer().notNull(),
    emailVerified: boolean().notNull().default(false),
    onboardingCompleted: boolean().notNull().default(false),
    organizationId: integer(),
    image: text(),
    ...timestamps,
    ...laxAuditing,
  },
  (t) => [
    foreignKey({
      columns: [t.organizationId],
      foreignColumns: [organizationTable.id],
    }),
    foreignKey({
      columns: [t.roleId],
      foreignColumns: [userRoleTable.id],
    }),
    foreignKey({
      columns: [t.createdById],
      foreignColumns: [t.id],
    }),
    foreignKey({
      columns: [t.updatedById],
      foreignColumns: [t.id],
    }),
    foreignKey({
      columns: [t.deletedById],
      foreignColumns: [t.id],
    }),
  ],
);

export const userRelations = relations(userTable, ({ one, many }) => ({
  userOnboarding: one(userOnboardingTable),
  emailVerificationRequests: many(emailVerificationRequestTable),
  userRole: one(userRoleTable, {
    fields: [userTable.roleId],
    references: [userRoleTable.id],
  }),
  organization: one(organizationTable, {
    fields: [userTable.organizationId],
    references: [organizationTable.id],
  }),
}));

export type User = InferModel<typeof userTable>;
export type UserID = User["id"];
export type CreateUser = InferCreateModel<typeof userTable>;
export type UpdateUser = InferUpdateModel<typeof userTable>;
export type ArchiveUser = InferArchiveModel<typeof userTable>;
