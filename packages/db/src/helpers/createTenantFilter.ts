import { and, type Column, eq, type Table } from "drizzle-orm";

export type TenantFilterableTable<TTable extends Table = Table> = TTable & {
  localId: Column<{
    name: "localId";
    tableName: string;
    dataType: "number";
    columnType: "PgInteger";
    data: number;
    driverParam: string | number;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }>;
  organizationId: Column<{
    name: "organizationId";
    tableName: string;
    dataType: "number";
    columnType: "PgInteger";
    data: number;
    driverParam: string | number;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
  }>;
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
