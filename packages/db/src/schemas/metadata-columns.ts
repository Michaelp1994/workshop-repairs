import { integer, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export default {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
  createdById: integer("created_by")
    .notNull()
    .references(() => users.id),
  updatedById: integer("updated_by").references(() => users.id),
  deletedById: integer("deleted_by").references(() => users.id),
};
