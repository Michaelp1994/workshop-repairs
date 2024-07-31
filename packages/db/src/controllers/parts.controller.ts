import { and, count, eq, isNull } from "drizzle-orm";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  partFilterMapping,
  partOrderMapping,
} from "../mappings/parts.mappings";
import {
  type CreatePart,
  type DeletePart,
  type PartID,
  parts,
  type UpdatePart,
} from "../schemas/parts.schema";

const globalFilterColumns = [parts.name];

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
      partFilterMapping,
    );
    const orderByParams = getOrderByParams(sorting, partOrderMapping);
    const query = db
      .select()
      .from(parts)
      .where(
        and(isNull(parts.deletedAt), globalFilterParams, ...columnFilterParams),
      )
      .orderBy(...orderByParams, parts.id)
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
      partFilterMapping,
    );

    const query = db
      .select({ count: count() })
      .from(parts)
      .where(
        and(isNull(parts.deletedAt), globalFilterParams, ...columnFilterParams),
      );

    const [res] = await query.execute();
    return res?.count;
  },
  async getSelect(props: GetSelect, db: Database) {
    const query = db
      .select({
        value: parts.id,
        label: parts.name,
      })
      .from(parts)
      .orderBy(parts.id);
    const res = await query.execute();
    return res;
  },
  async getById(id: PartID, db: Database) {
    const query = db.select().from(parts).where(eq(parts.id, id));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreatePart, db: Database) {
    const query = db.insert(parts).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdatePart, db: Database) {
    const query = db
      .update(parts)
      .set(input)
      .where(eq(parts.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeletePart, db: Database) {
    const query = db
      .update(parts)
      .set(input)
      .where(eq(parts.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
