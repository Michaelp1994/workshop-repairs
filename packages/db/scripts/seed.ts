import { eq, sql } from "drizzle-orm";

import { db } from "../src/index";
import { schema } from "../src/schemas/index";
import assetStatusesData from "./seeds/asset_statuses.json";
import assetsData from "./seeds/assets.json";
import clientsData from "./seeds/clients.json";
import equipmentTypeData from "./seeds/equipment_types.json";
import locationsData from "./seeds/locations.json";
import manufacturersData from "./seeds/manufacturers.json";
import modelImagesData from "./seeds/model_images.json";
import modelsData from "./seeds/models.json";
import organizationsData from "./seeds/organizations.json";
import partsData from "./seeds/parts.json";
import partsToModelsData from "./seeds/parts_to_models.json";
import repairCommentsData from "./seeds/repair_comments.json";
import repairImagesData from "./seeds/repair_images.json";
import repairPartsData from "./seeds/repair_parts.json";
import repairStatusTypesData from "./seeds/repair_status_types.json";
import repairTypesData from "./seeds/repair_types.json";
import repairsData from "./seeds/repairs.json";
import userTypesData from "./seeds/user_types.json";
import usersData from "./seeds/users.json";

function formatDate(date: string | null) {
  if (!date) {
    return null;
  }
  return new Date(date);
}

function formatCreatedAtDate(date: string) {
  return new Date(date);
}

await db.transaction(async (tx) => {
  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);
  for await (const table of Object.values(schema)) {
    await tx.execute(sql`TRUNCATE ${table} RESTART IDENTITY CASCADE; `);
  }

  await tx.insert(schema.userTypeTable).values(
    userTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("user types done");

  await tx.insert(schema.organizationTable).values(
    organizationsData.map((data) => ({
      ...data,
    })),
  );

  await tx.insert(schema.userTable).values(
    usersData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("users done");

  await tx.insert(schema.assetStatusTable).values(
    assetStatusesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("asset statuses done");

  await tx.insert(schema.repairTypeTable).values(
    repairTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repair types done");

  await tx.insert(schema.clientTable).values(
    clientsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("clients done");

  await tx.insert(schema.locationTable).values(
    locationsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("locations done");

  await tx.insert(schema.manufacturerTable).values(
    manufacturersData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("manufacturers done");

  await tx.insert(schema.equipmentTypeTable).values(
    equipmentTypeData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("equipment types done");

  await tx.insert(schema.modelTable).values(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modelsData.map(({ defaultImageId, ...data }) => {
      return {
        ...data,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      };
    }),
  );

  console.log("models done");

  await tx.insert(schema.modelImageTable).values(
    modelImagesData.map((data) => {
      return {
        ...data,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      };
    }),
  );

  console.log("model images done");

  for await (const { defaultImageId, id } of modelsData) {
    if (defaultImageId) {
      await tx
        .update(schema.modelTable)
        .set({
          defaultImageId,
        })
        .where(eq(schema.modelTable.id, id));
    }
  }

  console.log("model default images done");

  await tx.insert(schema.partTable).values(
    partsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("parts done");

  await tx.insert(schema.partsToModelTable).values(partsToModelsData);

  console.log("parts to models done");

  await tx.insert(schema.assetTable).values(
    assetsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("assets done");

  await tx.insert(schema.repairStatusTypeTable).values(
    repairStatusTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  await tx.insert(schema.repairTable).values(
    repairsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repairs done");

  await tx.insert(schema.repairImageTable).values(
    repairImagesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repair images done");

  await tx.insert(schema.repairCommentTable).values(
    repairCommentsData
      .map((data) => ({
        ...data,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      }))
      .slice(0, 3000),
  );

  await tx.insert(schema.repairCommentTable).values(
    repairCommentsData
      .map((data) => ({
        ...data,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      }))
      .slice(3000, undefined),
  );

  console.log("repair comments done");

  await tx.insert(schema.repairPartTable).values(
    repairPartsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repair parts done");
});

console.log("done seeding");
