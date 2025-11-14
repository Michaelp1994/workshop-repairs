import { type InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { type InferModel } from "../types";
import { laxAuditing, timestamps } from "./columns.helpers";
import { userTable } from "./user.table";

export const userTypeTable = pgTable("user_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  ...timestamps,
  ...laxAuditing,
});

export const userTypeRelations = relations(userTypeTable, ({ many }) => ({
  users: many(userTable),
}));

export type UserType = InferModel<typeof userTypeTable>;
export type UserTypeID = UserType["id"];
export type UserTypeInput = InferInsertModel<typeof userTypeTable>;
