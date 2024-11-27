import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { timestamps } from "./columns.helpers";
import { userTable } from "./user.sql";

export const userTypeTable = pgTable("user_type", {
  id: serial().primaryKey(),
  name: varchar().notNull().unique(),
  ...timestamps,
});

export const userTypeRelations = relations(userTypeTable, ({ many }) => ({
  users: many(userTable),
}));

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
