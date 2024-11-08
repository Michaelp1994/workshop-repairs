import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { db } from "../index";
import {
  assetFilterMapping,
  assetOrderMapping,
} from "../mappings/assets.mappings";
import {
  type ArchiveAsset,
  type AssetID,
  assetTable,
  type CreateAsset,
  type UpdateAsset,
} from "../schemas/asset.table";
import { assetStatusTable } from "../schemas/asset-status.table";
import { clientTable } from "../schemas/client.table";
import { locationTable } from "../schemas/location.table";
import { manufacturerTable } from "../schemas/manufacturer.table";
import { modelTable } from "../schemas/model.table";
import { modelImageTable } from "../schemas/model-image.table";
import { type RepairID, repairTable } from "../schemas/repair.table";

const assetFields = getTableColumns(assetTable);

const globalFilterColumns = [
  assetTable.assetNumber,
  assetTable.serialNumber,
  locationTable.name,
  manufacturerTable.name,
  modelTable.name,
];

export function getAll(
  { globalFilter, sorting, pagination, columnFilters }: GetAllInput,
  organizationId: OrganizationID,
) {
  const orderByParams = getOrderByParams(sorting, assetOrderMapping);
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    assetFilterMapping,
  );

  const query = db
    .select({
      ...assetFields,
      location: {
        id: locationTable.id,
        name: locationTable.name,
      },
      status: {
        id: assetStatusTable.id,
        name: assetStatusTable.name,
      },
      client: {
        id: clientTable.id,
        name: clientTable.name,
      },
      model: {
        id: modelTable.id,
        nickname: modelTable.nickname,
        imageUrl: modelImageTable.url,
      },
      manufacturer: {
        id: manufacturerTable.id,
        name: manufacturerTable.name,
      },
    })
    .from(assetTable)
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(clientTable, eq(assetTable.clientId, clientTable.id))
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
        isNull(assetTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, assetTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);

  return query.execute();
}

export async function getCount(
  { globalFilter, columnFilters }: GetCountInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    assetFilterMapping,
  );

  const query = db
    .select({ count: count() })
    .from(assetTable)
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .where(
      and(
        isNull(assetTable.deletedAt),
        eq(assetTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
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
