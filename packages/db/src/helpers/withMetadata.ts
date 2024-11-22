import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { db } from "..";
import { userTable } from "../tables/user.sql";

export default function withMetadata(table: T, fields) {
  const createdByTable = alias(userTable, "createdBy");
  const updatedByTable = alias(userTable, "updatedBy");
  const deletedByTable = alias(userTable, "deletedBy");
  return db
    .select({
      ...fields,
      createdBy: {
        id: createdByTable.id,
        firstName: createdByTable.firstName,
        lastName: createdByTable.lastName,
      },
      updatedBy: {
        id: updatedByTable.id,
        firstName: updatedByTable.firstName,
        lastName: updatedByTable.lastName,
      },
      deletedBy: {
        id: deletedByTable.id,
        firstName: deletedByTable.firstName,
        lastName: deletedByTable.lastName,
      },
    })
    .from(table)
    .innerJoin(createdByTable, eq(table.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(table.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(table.deletedById, deletedByTable.id));
}
