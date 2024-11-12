import { integer, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

import type {
  InferArchiveModel,
  InferCreateModel,
  InferModel,
  InferUpdateModel,
} from "../types";

import metadataColumns from "./metadata-columns";
import { organizationTable } from "./organization.table";

export const clientTable = pgTable(
  "client",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    ...metadataColumns,
  },
  (t) => [unique().on(t.name, t.organizationId)],
);

export type Client = InferModel<typeof clientTable>;
export type ClientID = Client["id"];
export type CreateClient = InferCreateModel<typeof clientTable>;
export type UpdateClient = InferUpdateModel<typeof clientTable>;
export type ArchiveClient = InferArchiveModel<typeof clientTable>;
