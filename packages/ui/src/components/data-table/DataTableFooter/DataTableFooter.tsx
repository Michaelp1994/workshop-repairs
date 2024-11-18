import { type Table } from "@tanstack/react-table";

import DataTablePagination from "./DataTablePagination";
import DataTableSelectionActions from "./DataTableSelectionActions";

interface DataTableFooterProps<T> {
  table: Table<T>;
}

export function DataTableFooter<T>({ table }: DataTableFooterProps<T>) {
  return (
    <div className="align-center flex justify-between p-4">
      <DataTableSelectionActions table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}
