import {
  type DeleteClient,
  type CreateClient,
  type UpdateClient,
  clients,
  type ClientID,
} from "../schemas/clients.schema";
import { and, count, eq, isNull } from "drizzle-orm";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  clientFilterMapping,
  clientOrderMapping,
} from "../mappings/clients.mappings";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getColumnFilterParams } from "../helpers/getColumnFilters";

export const globalFilterColumns = [clients.name];

export default {
  getAll(
    { pagination, sorting, globalFilter, columnFilters }: GetAll,
    db: Database,
  ) {
    const orderByParams = getOrderByParams(sorting, clientOrderMapping);
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      clientFilterMapping,
    );

    const query = db
      .select()
      .from(clients)
      .where(
        and(
          isNull(clients.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, clients.id)
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
      clientFilterMapping,
    );
    const query = db
      .select({ count: count() })
      .from(clients)
      .where(
        and(
          isNull(clients.deletedAt),
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
        value: clients.id,
        label: clients.name,
      })
      .from(clients)
      .orderBy(clients.name);
    return query.execute();
  },
  async getById(id: ClientID, db: Database) {
    const query = db.select().from(clients).where(eq(clients.id, id));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateClient, db: Database) {
    const query = db.insert(clients).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateClient, db: Database) {
    const query = db
      .update(clients)
      .set(input)
      .where(eq(clients.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
  async delete(input: DeleteClient, db: Database) {
    const query = db
      .update(clients)
      .set(input)
      .where(eq(clients.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
