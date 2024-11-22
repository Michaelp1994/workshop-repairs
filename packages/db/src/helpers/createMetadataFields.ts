import { alias } from "drizzle-orm/pg-core";

import { userTable } from "../tables/user.sql";

export default function createMetadataFields() {
  const createdByTable = alias(userTable, "createdBy");
  const updatedByTable = alias(userTable, "updatedBy");
  const deletedByTable = alias(userTable, "deletedBy");
  return {
    createdByTable,
    updatedByTable,
    deletedByTable,
    metadata: {
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
    },
  };
}
