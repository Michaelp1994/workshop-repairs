import { integer, timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  deletedAt: timestamp(),
};

export const strictAuditing = {
  createdById: integer().notNull(),
  updatedById: integer(),
  deletedById: integer(),
};

export const laxAuditing = {
  createdById: integer(),
  updatedById: integer(),
  deletedById: integer(),
};
