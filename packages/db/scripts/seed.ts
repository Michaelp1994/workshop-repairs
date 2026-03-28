import { hashPassword } from "@repo/auth/password";
import { getTableName, sql } from "drizzle-orm";

import { createDbConnection } from "../src/index";
import { schema } from "../src/schema";
import asset_statuses from "./data/staging/asset_statuses.json";
import clients from "./data/staging/clients.json";
import equipment_types from "./data/staging/equipment_types.json";
import locations from "./data/staging/locations.json";
import manufacturers from "./data/staging/manufacturers.json";
import models from "./data/staging/models.json";
import organization_sequences from "./data/staging/organization_sequences.json";
import organizations from "./data/staging/organizations.json";
import parts from "./data/staging/parts.json";
import parts_to_models from "./data/staging/parts_to_models.json";
import repair_status_types from "./data/staging/repair_status_types.json";
import repair_types from "./data/staging/repair_types.json";

console.log("Seeding database...");
const email = process.env["TEST_USER_EMAIL"];
const password = process.env["TEST_USER_PASSWORD"];

if (!email || !password) {
  throw new Error("TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env");
}

if (
  !process.env["POSTGRES_HOST"] ||
  !process.env["POSTGRES_PORT"] ||
  !process.env["POSTGRES_USER"] ||
  !process.env["POSTGRES_PASSWORD"] ||
  !process.env["POSTGRES_DB"]
) {
  throw new Error("env vars not set for drizzle");
}

try {
  const db = createDbConnection({
    host: process.env["POSTGRES_HOST"],
    port: Number(process.env["POSTGRES_PORT"]),
    user: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    database: process.env["POSTGRES_DB"],
  });
  await db.transaction(async (t) => {
    for (const table of Object.values(schema)) {
      const tableName = getTableName(table);
      await t.execute(
        sql`TRUNCATE ${sql.identifier(tableName)} RESTART IDENTITY CASCADE;`,
      );
      console.log(`reset ${tableName}`);
    }
    // await t.execute(sql`SET CONSTRAINTS ALL IMMEDIATE;`);
    await t.insert(schema.assetStatusTable).values(asset_statuses);
    await t.insert(schema.repairStatusTypeTable).values(repair_status_types);
    await t.insert(schema.repairTypeTable).values(repair_types);
    console.log("Inserted config data.");
    const [organization] = await t
      .insert(schema.organizationTable)
      .values(organizations)
      .returning();

    if (!organization) {
      throw new Error("Failed to create organization");
    }
    const [user] = await t
      .insert(schema.userTable)
      .values({
        email: email,
        password: await hashPassword(password),
        firstName: "Test",
        lastName: "User",
        onboardingCompleted: true,
        organizationId: organization.id,
      })
      .returning();

    if (!user) {
      throw Error("Failed to create user");
    }

    await t.insert(schema.organizationSequenceTable).values(
      organization_sequences.map((sequence) => ({
        ...sequence,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );

    await t.insert(schema.clientTable).values(
      clients.map((client) => ({
        ...client,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
    await t.insert(schema.equipmentTypeTable).values(
      equipment_types.map((equipment_type) => ({
        ...equipment_type,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
    await t.insert(schema.locationTable).values(
      locations.map((location) => ({
        ...location,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
    await t.insert(schema.manufacturerTable).values(
      manufacturers.map((manufacturer) => ({
        ...manufacturer,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
    await t.insert(schema.modelTable).values(
      models.map((model) => ({
        ...model,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );

    await t.insert(schema.partTable).values(
      parts.map((part) => ({
        description: "",
        ...part,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
    await t.insert(schema.partToModelTable).values(
      parts_to_models.map((part_to_model) => ({
        ...part_to_model,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );
  });
  console.log("Database seeded successfully!");
  await db.$client.end();
} catch (err) {
  console.error(err, "Failed to seed database.");
  throw err;
}
