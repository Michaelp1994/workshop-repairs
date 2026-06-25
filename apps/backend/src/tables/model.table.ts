import { type InferInsertModel } from "drizzle-orm";
import {
  foreignKey,
  integer,
  pgTable,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import auditConstraints from "../helpers/auditConstraints";
import { strictAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../types";
import { equipmentTypeTable } from "./equipmentType.table";
import { manufacturerTable } from "./manufacturer.table";
import { modelImageTable } from "./modelImage.table";
import { organizationTable } from "./organization.table";

export const modelTable = pgTable(
  "model",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    localId: integer().notNull(),
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
    ...strictAuditing,
  },
  (t) => [
    ...auditConstraints(t),
    unique().on(t.name, t.organizationId),
    unique().on(t.localId, t.organizationId),
    unique().on(t.nickname, t.organizationId),
    foreignKey({
      columns: [t.defaultImageId],
      foreignColumns: [modelImageTable.id],
    }),
  ],
);

export type Model = InferModel<typeof modelTable>;
export type ModelID = Model["id"];
export type ModelInput = InferInsertModel<typeof modelTable>;
