import {
  foreignKey,
  integer,
  pgTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import {
  type InferArchiveModel,
  type InferCreateModel,
  type InferModel,
  type InferUpdateModel,
} from "../types";
import { equipmentTypeTable } from "./equipment-type.table";
import { manufacturerTable } from "./manufacturer.table";
import metadataColumns from "./metadata-columns";
import { modelImageTable } from "./model-image.table";
import { organizationTable } from "./organization.table";

export const modelTable = pgTable(
  "model",
  {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    nickname: varchar().notNull(),
    manufacturerId: integer()
      .notNull()
      .references(() => manufacturerTable.id),
    organizationId: integer()
      .notNull()
      .references(() => organizationTable.id),
    equipmentTypeId: integer()
      .notNull()
      .references(() => equipmentTypeTable.id),
    defaultImageId: integer(),
    ...metadataColumns,
  },
  (table) => [
    unique().on(table.name, table.organizationId),
    unique().on(table.nickname, table.organizationId),
    foreignKey({
      columns: [table.defaultImageId],
      foreignColumns: [modelImageTable.id],
    }),
  ],
);

export type Model = InferModel<typeof modelTable>;
export type ModelID = Model["id"];
export type CreateModel = InferCreateModel<typeof modelTable>;
export type UpdateModel = InferUpdateModel<typeof modelTable>;
export type ArchiveModel = InferArchiveModel<typeof modelTable>;
