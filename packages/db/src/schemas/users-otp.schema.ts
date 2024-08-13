import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export const usersOtp = pgTable("users_otp", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  otp: varchar("otp"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
