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
import { auditing, timestamps } from "./columns.helpers";
import { equipmentTypeTable } from "./equipment-type.sql";
import { manufacturerTable } from "./manufacturer.sql";
import { modelImageTable } from "./model-image.sql";
import { organizationTable } from "./organization.sql";

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
    ...timestamps,
    ...auditing,
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
