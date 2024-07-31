import {
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferCreateModel,
  type InferDeleteModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
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
    otp: varchar("otp"),
    otpGeneratedAt: timestamp("otp_generated_at"),
    emailVerified: timestamp("email_verified", {
      mode: "date",
      withTimezone: true,
    }),
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
export type DeleteUser = InferDeleteModel<typeof users>;
