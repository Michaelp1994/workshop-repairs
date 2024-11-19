import { integer, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "./user.sql";

export default {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  deletedAt: timestamp(),
  createdById: integer()
    .notNull()
    .references(() => userTable.id),
  updatedById: integer().references(() => userTable.id),
  deletedById: integer().references(() => userTable.id),
};
