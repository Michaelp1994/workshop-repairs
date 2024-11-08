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
import { organizations } from "./organizations.schema";
import { userTypes } from "./user-types.schema";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name").notNull(),
    lastName: varchar("last_name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password").notNull(),
    typeId: integer("type_id").notNull(),
    emailVerified: boolean().default(false),
    onboardingCompleted: boolean().default(false),
    organizationId: integer().references(() => organizations.id),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"),
    createdById: integer("created_by"),
    updatedById: integer("updated_by"),
    deletedById: integer("deleted_by"),
  },
  (t) => {
    return {
      type: foreignKey({
        columns: [t.typeId],
        foreignColumns: [userTypes.id],
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

export type User = InferModel<typeof users>;
export type UserID = User["id"];
export type CreateUser = InferCreateModel<typeof users>;
export type UpdateUser = InferUpdateModel<typeof users>;
export type ArchiveUser = InferArchiveModel<typeof users>;
