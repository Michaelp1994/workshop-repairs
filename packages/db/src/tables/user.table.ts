import { type InferInsertModel } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { organizationTable } from "./organization.table";
import { userTypeTable } from "./userType.table";

export const userTable = pgTable(
  "user",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar().notNull(),
    lastName: varchar().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar().notNull(),
    typeId: integer().notNull(),
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
      columns: [t.typeId],
      foreignColumns: [userTypeTable.id],
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

export type User = InferModel<typeof userTable>;
export type UserID = User["id"];
export type UserInput = InferInsertModel<typeof userTable>;
