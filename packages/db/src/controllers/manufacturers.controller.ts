import { and, count, eq, ilike, isNull } from "drizzle-orm";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { formatSearch } from "../helpers/formatSearch";
import { getOrderByParams } from "../helpers/getOrderByParams";
import {
  type DeleteManufacturer,
  manufacturers,
  type CreateManufacturer,
  type UpdateManufacturer,
  type ManufacturerID,
} from "../schemas/manufacturers.schema";
import { type Database } from "../index";
import {
  manufacturerFilterMapping,
  manufacturerOrderMapping,
} from "../mappings/manufacturers.mappings";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getColumnFilterParams } from "../helpers/getColumnFilters";

const globalFilterColumns = [manufacturers.name];

export default {
  getAll(
    { pagination, sorting, globalFilter, columnFilters }: GetAll,
    db: Database,
  ) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      manufacturerFilterMapping,
    );
    const orderByParams = getOrderByParams(sorting, manufacturerOrderMapping);

    const query = db
      .select()
      .from(manufacturers)
      .where(
        and(
          isNull(manufacturers.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, manufacturers.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount({ globalFilter, columnFilters }: GetCount, db: Database) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      manufacturerFilterMapping,
    );

    const query = db
      .select({ count: count() })
      .from(manufacturers)
      .where(
        and(
          isNull(manufacturers.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  },
  async getById(id: ManufacturerID, db: Database) {
    const query = db
      .select()
      .from(manufacturers)
      .where(eq(manufacturers.id, id));
    const [res] = await query.execute();
    return res;
  },
  async getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({
        value: manufacturers.id,
        label: manufacturers.name,
      })
      .from(manufacturers)
      .where(isNull(manufacturers.deletedAt));
    return query.execute();
  },
  async create(input: CreateManufacturer, db: Database) {
    const query = db.insert(manufacturers).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateManufacturer, db: Database) {
    const query = db
      .update(manufacturers)
      .set(input)
      .where(eq(manufacturers.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteManufacturer, db: Database) {
    const query = db
      .update(manufacturers)
      .set(input)
      .where(eq(manufacturers.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
