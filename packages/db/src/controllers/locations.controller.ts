import {
  type DeleteLocation,
  locations,
  type CreateLocation,
  type UpdateLocation,
  type LocationID,
} from "../schemas/locations.schema";
import { and, count, eq, isNull } from "drizzle-orm";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type Database } from "../index";
import {
  locationFilterMapping,
  locationOrderMapping,
} from "../mappings/locations.mappings";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getColumnFilterParams } from "../helpers/getColumnFilters";

const globalFilterColumns = [locations.name];

export default {
  getAll(
    { pagination, globalFilter, sorting, columnFilters }: GetAll,
    db: Database,
  ) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      locationFilterMapping,
    );
    const orderByParams = getOrderByParams(sorting, locationOrderMapping);
    const query = db
      .select()
      .from(locations)
      .where(
        and(
          isNull(locations.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, locations.id)
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
      locationFilterMapping,
    );

    const query = db
      .select({ count: count() })
      .from(locations)
      .where(
        and(
          isNull(locations.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  },
  getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({
        value: locations.id,
        label: locations.name,
      })
      .from(locations)
      .orderBy(locations.name);
    return query.execute();
  },
  async getById(id: LocationID, db: Database) {
    const query = db.select().from(locations).where(eq(locations.id, id));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateLocation, db: Database) {
    const query = db.insert(locations).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateLocation, db: Database) {
    const query = db
      .update(locations)
      .set(input)
      .where(eq(locations.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteLocation, db: Database) {
    const query = db
      .update(locations)
      .set(input)
      .where(eq(locations.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
