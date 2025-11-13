import { and, type AnyColumn, eq, type Table } from "drizzle-orm";

export type TenantFilterableTable<TTable extends Table = Table> = TTable & {
  localId: AnyColumn;
  organizationId: AnyColumn;
};
export function createTenantFilter<T extends Table>(
  table: TenantFilterableTable<T>,
  filterValue: number | undefined,
  organizationId: number,
) {
  const localIdColumn = table.localId;
  const orgIdColumn = table.organizationId;

  if (filterValue) {
    return and(eq(localIdColumn, filterValue), eq(orgIdColumn, organizationId));
  }
  return undefined;
}
