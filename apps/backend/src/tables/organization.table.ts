import { type InferInsertModel } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { laxAuditing, timestamps } from "../helpers/commonColumns";
import { type InferModel } from "../services/types";

export const organizationTable = pgTable("organization", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull().unique(),
  logo: varchar(),
  invitationCode: uuid().defaultRandom(),
  ...timestamps,
  ...laxAuditing,
});

export type Organization = InferModel<typeof organizationTable>;
export type OrganizationID = Organization["id"];
export type OrganizationInput = InferInsertModel<typeof organizationTable>;
