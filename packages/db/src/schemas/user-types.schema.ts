import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";

export const userTypes = pgTable("user_types", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});

export type UserType = InferModel<typeof userTypes>;
export type UserTypeID = UserType["id"];
export type CreateUserType = InferCreateModel<typeof userTypes>;
export type UpdateUserType = Omit<
  InferUpdateModel<typeof userTypes>,
  "updatedById"
>;
export type DeleteUserType = Omit<
  InferDeleteModel<typeof userTypes>,
  "deletedById"
>;
