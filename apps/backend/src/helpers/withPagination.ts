import { type PgSelect } from "drizzle-orm/pg-core";

export function withPagination<T extends PgSelect>(
  query: T,
  pagination: { pageIndex: number; pageSize: number },
) {
  return query
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
}
