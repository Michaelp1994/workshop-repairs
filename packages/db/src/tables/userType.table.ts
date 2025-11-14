import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";

export const userTypeTable = pgTable("user_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  ...timestamps,
  ...laxAuditing,
});

export type UserType = InferModel<typeof userTypeTable>;
export type UserTypeID = UserType["id"];
export type UserTypeInput = InferInsertModel<typeof userTypeTable>;
