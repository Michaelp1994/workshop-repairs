import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import { userTable } from "./user.sql";

export const emailVerificationRequestTable = pgTable(
  "email_verification_request",
  {
    id: serial().primaryKey(),
    userId: integer()
      .notNull()
      .references(() => userTable.id),
    email: text().notNull(),
    code: varchar(),
    expiresAt: timestamp().notNull(),
    emailVerified: boolean().notNull().default(false),
    twoFactorVerified: boolean().notNull().default(false),
  },
);

export const emailVerificationRequestRelations = relations(
  emailVerificationRequestTable,
  ({ many }) => ({
    users: many(userTable),
  }),
);

export type EmailVerificationRequest = InferModel<
  typeof emailVerificationRequestTable
>;

export type EmailVerificationRequestID = EmailVerificationRequest["id"];

export type CreateEmailVerificationRequest = InferCreateModel<
  typeof emailVerificationRequestTable
>;

export type UpdateEmailVerificationRequest = InferUpdateModel<
  typeof emailVerificationRequestTable
>;

export type ArchiveEmailVerificationRequest = InferArchiveModel<
  typeof emailVerificationRequestTable
>;
