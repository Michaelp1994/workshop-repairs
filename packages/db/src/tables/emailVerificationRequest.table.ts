import { type InferInsertModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import auditConstraints from "./audit-constraints.helpers";
import { strictAuditing, timestamps } from "./columns.helpers";
import { userTable } from "./user.table";

export const emailVerificationRequestTable = pgTable(
  "email_verification_request",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .references(() => userTable.id),
    email: text().notNull(),
    code: varchar(),
    expiresAt: timestamp().notNull(),
    emailVerified: boolean().notNull().default(false),
    twoFactorVerified: boolean().notNull().default(false),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [...auditConstraints(t)],
);

export const emailVerificationRequestRelations = relations(
  emailVerificationRequestTable,
  ({ one }) => ({
    users: one(userTable, {
      fields: [emailVerificationRequestTable.userId],
      references: [userTable.id],
    }),
  }),
);

export type EmailVerificationRequest = InferModel<
  typeof emailVerificationRequestTable
>;

export type EmailVerificationRequestID = EmailVerificationRequest["id"];
export type EmailVerificationRequestInput = InferInsertModel<
  typeof emailVerificationRequestTable
>;
