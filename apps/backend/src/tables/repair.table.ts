import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../services/types";
import { assetTable } from "./asset.table";
import { clientTable } from "./client.table";
import { organizationTable } from "./organization.table";
import { repairStatusTypeTable } from "./repairStatusType.table";
import { repairTypeTable } from "./repairType.table";

export const repairTable = pgTable(
  "repair",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
    fault: varchar().notNull(),
    summary: varchar(),
    clientId: integer()
      .notNull()
      .references(() => clientTable.id),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    clientReference: varchar().notNull(),
    typeId: integer()
      .notNull()
      .references(() => repairTypeTable.id),
    statusId: integer()
      .notNull()
      .references(() => repairStatusTypeTable.id),
    assetId: integer()
      .notNull()
      .references(() => assetTable.id),
    ...timestamps,
    ...strictAuditing,
  },
  (t) => [unique().on(t.localId, t.organizationId), ...auditConstraints(t)],
);

export type Repair = InferModel<typeof repairTable>;
export type RepairID = Repair["id"];
export type RepairInput = InferInsertModel<typeof repairTable>;
