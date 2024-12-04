import { hashPassword } from "@repo/auth/password";
import { getTableColumns, getTableName, sql } from "drizzle-orm";
import { reset } from "drizzle-seed";

import { db } from "../index";
import { schema } from "../tables";
import asset_statuses from "./data/staging/asset_statuses.json";
import clients from "./data/staging/clients.json";
import equipment_types from "./data/staging/equipment_types.json";
import locations from "./data/staging/locations.json";
import manufacturers from "./data/staging/manufacturers.json";
import models from "./data/staging/models.json";
import organizations from "./data/staging/organizations.json";
import parts from "./data/staging/parts.json";
import parts_to_models from "./data/staging/parts_to_models.json";
import repair_status_types from "./data/staging/repair_status_types.json";
import repair_types from "./data/staging/repair_types.json";
import user_roles from "./data/staging/user_roles.json";

console.log("Seeding database...");
const email = process.env["TEST_USER_EMAIL"];
const password = process.env["TEST_USER_PASSWORD"];
if (!email || !password) {
  throw Error("TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env");
}
try {
  await reset(db, schema);
  await db.transaction(async (t) => {
    await t.insert(schema.assetStatusTable).values(asset_statuses);
    await t.insert(schema.repairStatusTypeTable).values(repair_status_types);
    await t.insert(schema.repairTypeTable).values(repair_types);
    const [organization] = await t
      .insert(schema.organizationTable)
      .values(
        organizations.map((organization) => ({
          ...organization,
        })),
      )
      .returning();
    if (!organization) {
      throw Error("Failed to create organization");
    }
    const [user] = await t
      .insert(schema.userTable)
      .values({
        email: email,
        password: await hashPassword(password),
        firstName: "Test",
        lastName: "User",
        roleId: 1,
        onboardingCompleted: true,
        organizationId: organization.id,
      })
      .returning();

    if (!user) {
      throw Error("Failed to create user");
    }

    await t.insert(schema.userRoleTable).values(
      user_roles.map((user_role) => ({
        organizationId: organization.id,
        ...user_role,
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
    await t.insert(schema.partsToModelTable).values(
      parts_to_models.map((part_to_model) => ({
        ...part_to_model,
        createdById: user.id,
        organizationId: organization.id,
      })),
    );

    await t.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);

    for await (const table of Object.values(schema)) {
      const tableName = getTableName(table);
      const columns = getTableColumns(table);
      if ("id" in columns) {
        await t.execute(
          sql`SELECT pg_catalog.setval(pg_get_serial_sequence('${table}', 'id'), MAX(id)) FROM ${table};`,
        );
        console.log(`reset ${tableName}`);
      } else {
        console.log(`skipped ${tableName}`);
      }
    }
    await t.execute(sql`SET CONSTRAINTS ALL IMMEDIATE;`);

    console.log("Database seeded successfully!");
  });
} catch (e) {
  console.error("Failed to seed database.");
  console.log(e);
}
