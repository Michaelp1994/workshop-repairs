import { sql } from "drizzle-orm";

import { db } from "../src/index";
import { schema } from "../src/schema";
import assetStatusesData from "./seeds/asset_statuses.json";
import assetsData from "./seeds/assets.json";
import clientsData from "./seeds/clients.json";
import locationsData from "./seeds/locations.json";
import manufacturersData from "./seeds/manufacturers.json";
import modelImagesData from "./seeds/model_images.json";
import modelsData from "./seeds/models.json";
import partsData from "./seeds/parts.json";
import partsToModelsData from "./seeds/parts_to_models.json";
import repairCommentsData from "./seeds/repair_comments.json";
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

  await tx.insert(schema.userTypes).values(
    userTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("user types done");

  await tx.insert(schema.users).values(
    usersData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("users done");

  await tx.insert(schema.assetStatuses).values(
    assetStatusesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("asset statuses done");

  await tx.insert(schema.repairTypes).values(
    repairTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repair types done");

  await tx.insert(schema.clients).values(
    clientsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("clients done");

  await tx.insert(schema.locations).values(
    locationsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("locations done");

  await tx.insert(schema.manufacturers).values(
    manufacturersData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("manufacturers done");

  await tx.insert(schema.models).values(
    modelsData.map((data) => {
      const { defaultImageId, ...rest } = data;
      return {
        ...rest,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      };
    }),
  );

  console.log("models done");

  await tx.insert(schema.modelImages).values(
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

  await tx.insert(schema.parts).values(
    partsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("parts done");

  await tx.insert(schema.partsToModels).values(partsToModelsData);

  console.log("parts to models done");

  await tx.insert(schema.assets).values(
    assetsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("assets done");

  await tx.insert(schema.repairStatusTypes).values(
    repairStatusTypesData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  await tx.insert(schema.repairs).values(
    repairsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repairs done");

  // await tx.insert(schema.repairImages).values(
  //     repairImagesData.map((data) => ({
  //         id: data.id,
  //         repairId: data.repair_id,
  //         url: data.url,
  //         caption: data.caption,
  //         createdAt: formatCreatedAtDate(data.createdAt),
  //         updatedAt: formatDate(data.updatedAt),
  //         deletedAt: formatDate(data.deletedAt),
  //         deletedById: data.deleted_by,
  //         updatedById: data.updated_by,
  //         createdById: data.created_by,
  //     }))
  // );

  // console.log("repair images done")

  await tx.insert(schema.repairComments).values(
    repairCommentsData
      .map((data) => ({
        ...data,
        createdAt: formatCreatedAtDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
        deletedAt: formatDate(data.deletedAt),
      }))
      .slice(0, 3000),
  );

  await tx.insert(schema.repairComments).values(
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

  await tx.insert(schema.repairParts).values(
    repairPartsData.map((data) => ({
      ...data,
      createdAt: formatCreatedAtDate(data.createdAt),
      updatedAt: formatDate(data.updatedAt),
      deletedAt: formatDate(data.deletedAt),
    })),
  );

  console.log("repair parts done");
});
