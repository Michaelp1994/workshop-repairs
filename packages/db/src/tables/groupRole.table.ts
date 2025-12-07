import { integer, pgTable, unique } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { groupTable } from "./group.table";
import { roleTable } from "./role.table";
import type { InferModel } from "../types";
import type { InferInsertModel } from "drizzle-orm";

export const groupRoleTable = pgTable(
  "group_role",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    groupId: integer()
      .notNull()
      .references(() => groupTable.id),
    roleId: integer()
      .notNull()
      .references(() => roleTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.groupId, t.roleId), ...auditConstraints(t)],
);

export type GroupRole = InferModel<typeof groupRoleTable>;
export type GroupRoleID = GroupRole["id"];
export type GroupRoleInput = InferInsertModel<typeof groupRoleTable>;
