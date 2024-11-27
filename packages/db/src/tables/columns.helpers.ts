import { integer, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "./user.sql";

export const timestamps = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  deletedAt: timestamp(),
};

export const auditing = {
  createdById: integer()
    .notNull()
    .references(() => userTable.id),
  updatedById: integer().references(() => userTable.id),
  deletedById: integer().references(() => userTable.id),
};
