import { db } from "./index";

import assetStatusesData from "./seeds/asset_statuses.json";
import assetsData from "./seeds/assets.json";
import clientsData from "./seeds/clients.json";
import locationsData from "./seeds/locations.json";
import manufacturersData from "./seeds/manufacturers.json";
import modelsData from "./seeds/models.json";
import partsToModelsData from "./seeds/parts_to_models.json";
import partsData from "./seeds/parts.json";
import repairCommentsData from "./seeds/repair_comments.json";
import repairPartsData from "./seeds/repair_parts.json";
import repairTypesData from "./seeds/repair_types.json";
import repairsData from "./seeds/repairs.json";
import userTypesData from "./seeds/user_types.json";
import usersData from "./seeds/users.json";
import repairStatusTypesData from "./seeds/repair_status_types.json";

import { schema } from "./schema";
import { sql } from "drizzle-orm";

const {
  assets,
  assetStatuses,
  clients,
  locations,
  manufacturers,
  models,
  parts,
  partsToModels,
  repairComments,
  repairImages,
  repairParts,
  repairs,
  repairStatusTypes,
  repairTypes,
  users,
  userTypes,
} = schema;

function formatDate(date: string | null) {
  if (!date) {
    return null;
  }
  return new Date(date);
}

function formatCreatedAtDate(date: string) {
  return new Date(date);
}
const tables = [
  assets,
  assetStatuses,
  clients,
  locations,
  manufacturers,
  models,
  parts,
  partsToModels,
  repairComments,
  repairImages,
  repairParts,
  repairs,
  repairStatusTypes,
  repairTypes,
  users,
  userTypes,
];

// await client.query(`TRUNCATE ${tables.join(", ")} RESTART IDENTITY;`);
await db.transaction(async (tx) => {
  await tx.execute(sql`SET CONSTRAINTS ALL DEFERRED;`);
  for await (const table of tables) {
    await tx.execute(sql`TRUNCATE ${table} RESTART IDENTITY CASCADE; `);
  }

  await tx.insert(userTypes).values(
    userTypesData.map((data) => ({
      id: data.id,
      name: data.name,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
    })),
  );

  console.log("user types done");

  await tx.insert(users).values(
    usersData.map((data) => ({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      typeId: data.type_id,
      email: data.email,
      password: data.password,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("users done");

  await tx.insert(assetStatuses).values(
    assetStatusesData.map((data) => ({
      id: data.id,
      name: data.name,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("asset statuses done");

  await tx.insert(repairTypes).values(
    repairTypesData.map((data) => ({
      id: data.id,
      name: data.name,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("repair types done");

  // if (repairStatusTypesData.length) {
  //     await tx.insert(repairStatusTypes).values(
  //         repairStatusTypesData.map((data) => ({
  //             color: data.color,
  //             name: data.name,
  //             createdById: data.created_by,
  //         }))
  //     );
  // }

  // await tx.insert(repairStatuses).values(
  //     repairStatusesData.map((data) => ({
  //         id: data.id,
  //         typeId: data.type_id,
  //         repairId: data.repair_id,
  //         repairStatusTypeId: data.repair_status_type_id,
  //         createdAt: formatCreatedAtDate(data.created_at),
  //         updatedAt: formatDate(data.updated_at),
  //         deletedAt: formatDate(data.deleted_at),
  //         deletedById: data.deleted_by,
  //         updatedById: data.updated_by,
  //         createdById: data.created_by,
  //     }))
  // );

  await tx.insert(clients).values(
    clientsData.map((data) => ({
      id: data.id,
      name: data.name,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("clients done");

  await tx.insert(locations).values(
    locationsData.map((data) => ({
      id: data.id,
      name: data.name,
      address: data.address,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("locations done");

  await tx.insert(manufacturers).values(
    manufacturersData.map((data) => ({
      id: data.id,
      name: data.name,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("manufacturers done");

  await tx.insert(models).values(
    modelsData.map((data) => ({
      id: data.id,
      name: data.name,
      nickname: data.nickname,
      manufacturerId: data.manufacturer_id,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("models done");

  await tx.insert(parts).values(
    partsData.map((data) => ({
      id: data.id,
      name: data.name,
      partNumber: data.part_number,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("parts done");

  await tx.insert(partsToModels).values(
    partsToModelsData.map((data) => ({
      partId: data.part_id,
      modelId: data.model_id,
      quantity: data.quantity,
    })),
  );

  console.log("parts to models done");

  await tx.insert(assets).values(
    assetsData.map((data) => ({
      id: data.id,
      assetNumber: "",
      locationId: data.location_id,
      modelId: data.model_id,
      serialNumber: data.serial_number,
      statusId: data.status_id,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("assets done");

  await tx.insert(repairStatusTypes).values(
    repairStatusTypesData.map((data) => ({
      id: data.id,
      name: data.name,
      colour: data.colour,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  await tx.insert(repairs).values(
    repairsData.map((data) => ({
      id: data.id,
      clientId: data.client_id,
      clientReference: data.client_reference,
      fault: data.fault,
      typeId: data.type_id,
      assetId: data.asset_id,
      statusId: 1,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("repairs done");

  // await tx.insert(repairImages).values(
  //     repairImagesData.map((data) => ({
  //         id: data.id,
  //         repairId: data.repair_id,
  //         url: data.url,
  //         caption: data.caption,
  //         createdAt: formatCreatedAtDate(data.created_at),
  //         updatedAt: formatDate(data.updated_at),
  //         deletedAt: formatDate(data.deleted_at),
  //         deletedById: data.deleted_by,
  //         updatedById: data.updated_by,
  //         createdById: data.created_by,
  //     }))
  // );

  // console.log("repair images done")

  await tx.insert(repairComments).values(
    repairCommentsData
      .map((data) => ({
        id: data.id,
        comment: data.comment,
        repairId: data.repair_id,
        createdAt: formatCreatedAtDate(data.created_at),
        updatedAt: formatDate(data.updated_at),
        deletedAt: formatDate(data.deleted_at),
        deletedById: data.deleted_by,
        updatedById: data.updated_by,
        createdById: data.created_by,
      }))
      .slice(0, 3000),
  );

  await tx.insert(repairComments).values(
    repairCommentsData
      .map((data) => ({
        id: data.id,
        comment: data.comment,
        repairId: data.repair_id,
        createdAt: formatCreatedAtDate(data.created_at),
        updatedAt: formatDate(data.updated_at),
        deletedAt: formatDate(data.deleted_at),
        deletedById: data.deleted_by,
        updatedById: data.updated_by,
        createdById: data.created_by,
      }))
      .slice(3000, undefined),
  );

  console.log("repair comments done");

  await tx.insert(repairParts).values(
    repairPartsData.map((data) => ({
      id: data.id,
      partId: data.part_id,
      repairId: data.repair_id,
      quantity: data.quantity,
      createdAt: formatCreatedAtDate(data.created_at),
      updatedAt: formatDate(data.updated_at),
      deletedAt: formatDate(data.deleted_at),
      deletedById: data.deleted_by,
      updatedById: data.updated_by,
      createdById: data.created_by,
    })),
  );

  console.log("repair parts done");
});

// await client.end();
