import type { BuildExtraConfigColumns } from "drizzle-orm";

import { foreignKey, type PgColumnBuilderBase } from "drizzle-orm/pg-core";

import { userTable } from "./user.sql";

export default function auditConstraints<
  TTableName extends string,
  TColumnsMap extends Record<string, PgColumnBuilderBase>,
>(t: BuildExtraConfigColumns<TTableName, TColumnsMap, "pg">) {
  if (!t["createdById"] || !t["updatedById"] || !t["deletedById"]) {
    throw new Error(
      "Audit constraints require createdById, updatedById, and deletedById columns",
    );
  }
  return [
    foreignKey({
      columns: [t["createdById"]],
      foreignColumns: [userTable.id],
    }),
    foreignKey({
      columns: [t["updatedById"]],
      foreignColumns: [userTable.id],
    }),
    foreignKey({
      columns: [t["deletedById"]],
      foreignColumns: [userTable.id],
    }),
  ];
}
