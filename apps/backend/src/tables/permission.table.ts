import type { InferInsertModel } from "drizzle-orm";

import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

import type { InferModel } from "../types";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";

export const permissionTable = pgTable(
  "permission",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    resource: text("resource").notNull(),
    action: text("action").notNull(),
    description: text("description"),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.resource, t.action), ...auditConstraints(t)],
);

export type Permission = InferModel<typeof permissionTable>;
export type PermissionID = Permission["id"];
export type PermissionInput = InferInsertModel<typeof permissionTable>;
