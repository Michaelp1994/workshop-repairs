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
import { equipmentTypes } from "./equipment-types.schema";
import { manufacturers } from "./manufacturers.schema";
import metadataColumns from "./metadata-columns";
import { modelImages } from "./model-images.schema";
import { organizations } from "./organizations.schema";

export const models = pgTable(
  "models",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    nickname: varchar("nickname").notNull(),
    manufacturerId: integer("manufacturer_id")
      .notNull()
      .references(() => manufacturers.id),
    organizationId: integer("organization_id")
      .notNull()
      .references(() => organizations.id),
    equipmentTypeId: integer("equipment_type_id")
      .notNull()
      .references(() => equipmentTypes.id),
    defaultImageId: integer("default_image_id"),
    ...metadataColumns,
  },
  (table) => {
    return {
      nameUnq: unique().on(table.name, table.organizationId),
      nicknameUnq: unique().on(table.nickname, table.organizationId),
      defaultImageRelation: foreignKey({
        columns: [table.defaultImageId],
        foreignColumns: [modelImages.id],
      }),
    };
  },
);

export type Model = InferModel<typeof models>;
export type ModelID = Model["id"];
export type CreateModel = InferCreateModel<typeof models>;
export type UpdateModel = InferUpdateModel<typeof models>;
export type ArchiveModel = InferArchiveModel<typeof models>;
