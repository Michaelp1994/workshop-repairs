import { PgColumn } from "drizzle-orm/pg-core";
import { formatSearch } from "./formatSearch";
import { ilike, or } from "drizzle-orm";

export function getGlobalFilterParams(
  globalFilter: string,
  columns: PgColumn[],
) {
  if (globalFilter === "") return undefined;
  const searchQuery = formatSearch(globalFilter);
  const columnsToSearch = columns.map((column) => ilike(column, searchQuery));
  return or(...columnsToSearch);
}
