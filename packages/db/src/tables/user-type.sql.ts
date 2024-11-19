import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const userTypeTable = pgTable("user_type", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  deletedAt: timestamp(),
});

export type UserType = InferModel<typeof userTypeTable>;
export type UserTypeID = UserType["id"];
export type CreateUserType = InferCreateModel<typeof userTypeTable>;
export type UpdateUserType = Omit<
  InferUpdateModel<typeof userTypeTable>,
  "updatedById"
>;
export type ArchiveUserType = Omit<
  InferArchiveModel<typeof userTypeTable>,
  "deletedById"
>;
