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

import { users } from "./users.schema";

export const emailVerificationRequests = pgTable(
  "email_verification_requests",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    email: text().notNull(),
    code: varchar("otp"),
    expiresAt: timestamp().notNull(),
    emailVerified: boolean().notNull().default(false),
    twoFactorVerified: boolean().notNull().default(false),
  },
);

export type EmailVerificationRequest = InferModel<
  typeof emailVerificationRequests
>;

export type EmailVerificationRequestID = EmailVerificationRequest["id"];

export type CreateEmailVerificationRequest = InferCreateModel<
  typeof emailVerificationRequests
>;

export type UpdateEmailVerificationRequest = InferUpdateModel<
  typeof emailVerificationRequests
>;

export type ArchiveEmailVerificationRequest = InferArchiveModel<
  typeof emailVerificationRequests
>;
