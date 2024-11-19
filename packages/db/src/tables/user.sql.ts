import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { organizationTable } from "./organization.sql";
import { userTypeTable } from "./user-type.sql";

export const userTable = pgTable(
  "user",
  {
    id: serial().primaryKey(),
    firstName: varchar().notNull(),
    lastName: varchar().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar().notNull(),
    typeId: integer().notNull(),
    emailVerified: boolean().notNull().default(false),
    onboardingCompleted: boolean().notNull().default(false),
    organizationId: integer().references(() => organizationTable.id),
    image: text(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
    deletedAt: timestamp(),
    createdById: integer(),
    updatedById: integer(),
    deletedById: integer(),
  },
  (t) => {
    return {
      type: foreignKey({
        columns: [t.typeId],
        foreignColumns: [userTypeTable.id],
      }),
      createdBy: foreignKey({
        columns: [t.createdById],
        foreignColumns: [t.id],
      }),
      updatedBy: foreignKey({
        columns: [t.updatedById],
        foreignColumns: [t.id],
      }),
      deletedBy: foreignKey({
        columns: [t.deletedById],
        foreignColumns: [t.id],
      }),
    };
  },
);

export type User = InferModel<typeof userTable>;
export type UserID = User["id"];
export type CreateUser = InferCreateModel<typeof userTable>;
export type UpdateUser = InferUpdateModel<typeof userTable>;
export type ArchiveUser = InferArchiveModel<typeof userTable>;
