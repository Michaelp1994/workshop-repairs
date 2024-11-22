import { ilike, or } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

function formatSearch(input: string) {
  return "%" + input.trim() + "%";
}

export function createGlobalFilterFunction(columns: PgColumn[]) {
  return function (globalFilter: string) {
    if (globalFilter === "") return undefined;
    const searchQuery = formatSearch(globalFilter);
    const columnsToSearch = columns.map((column) => ilike(column, searchQuery));
    return or(...columnsToSearch);
  };
}
