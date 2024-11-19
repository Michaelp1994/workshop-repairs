import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import { createCountQuery, createDataQuery } from "../queries/assets.queries";
import {
  type ArchiveAsset,
  type AssetID,
  assetTable,
  type CreateAsset,
  type UpdateAsset,
} from "../tables/asset.sql";
import { assetStatusTable } from "../tables/asset-status.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { type RepairID, repairTable } from "../tables/repair.sql";

const assetFields = getTableColumns(assetTable);

export function getAll(
  dataTableParams: GetAllInput,
  organizationId: OrganizationID,
) {
  const query = createDataQuery(
    dataTableParams,
    isNull(assetTable.deletedAt),
    eq(assetTable.organizationId, organizationId),
  );

  const res = query.execute();

  return res;
}

export async function getCount(
  dataTableParams: GetCountInput,
  organizationId: OrganizationID,
) {
  const query = createCountQuery(
    dataTableParams,
    isNull(assetTable.deletedAt),
    eq(assetTable.organizationId, organizationId),
  );

  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(
  { limit, cursor }: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({ value: assetTable.id, label: assetTable.serialNumber })
    .from(assetTable)
    .orderBy(assetTable.id)
    .limit(limit + 1)
    .where(
      and(
        eq(assetTable.organizationId, organizationId),
        isNull(assetTable.deletedAt),
      ),
    )
    .offset(cursor);

  const data = await query.execute();
  const nextCursor = data.length > limit ? data.pop()?.value : undefined;
  return { data, nextCursor };
}

export async function getSimpleSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({
      ...assetFields,
      model: {
        id: modelTable.id,
        name: modelTable.name,
        imageUrl: modelImageTable.url,
      },
      manufacturer: {
        id: manufacturerTable.id,
        name: manufacturerTable.name,
      },
    })
    .from(assetTable)
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(
      and(
        eq(assetTable.organizationId, organizationId),
        isNull(assetTable.deletedAt),
      ),
    )
    .orderBy(assetTable.id);

  const res = await query.execute();
  return res;
}

export async function getById(id: AssetID, organizationId: OrganizationID) {
  const query = db
    .select({
      ...assetFields,
      location: {
        id: locationTable.id,
        name: locationTable.name,
        address: locationTable.address,
      },
    })
    .from(assetTable)
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .where(
      and(eq(assetTable.id, id), eq(assetTable.organizationId, organizationId)),
    );
  const [res] = await query.execute();
  return res;
}

export async function getByRepairId(
  id: RepairID,
  organizationId: OrganizationID,
) {
  const repairQuery = db
    .select({
      assetId: repairTable.assetId,
    })
    .from(repairTable)
    .where(eq(repairTable.id, id));
  const [repair] = await repairQuery.execute();

  if (!repair) {
    return;
  }

  const assetQuery = db
    .select()
    .from(assetTable)
    .leftJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .leftJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .leftJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .leftJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .where(
      and(
        eq(assetTable.id, repair.assetId),
        eq(assetTable.organizationId, organizationId),
      ),
    );
  const [asset] = await assetQuery.execute();
  return asset;
}
export async function create(input: CreateAsset) {
  const query = db.insert(assetTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(
  { id, ...values }: UpdateAsset,
  organizationId: OrganizationID,
) {
  const query = db
    .update(assetTable)
    .set(values)
    .where(
      and(eq(assetTable.id, id), eq(assetTable.organizationId, organizationId)),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
export async function archive(
  { id, ...values }: ArchiveAsset,
  organizationId: OrganizationID,
) {
  const query = db
    .update(assetTable)
    .set(values)
    .where(
      and(eq(assetTable.id, id), eq(assetTable.organizationId, organizationId)),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
