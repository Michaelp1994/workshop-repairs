import { type PgSelectQueryBuilder } from "drizzle-orm/pg-core";

export function withPagination<T extends PgSelectQueryBuilder>(
  query: T,
  pageIndex: number,
  pageSize: number,
) {
  return query.limit(pageSize).offset(pageIndex * pageSize);
}
