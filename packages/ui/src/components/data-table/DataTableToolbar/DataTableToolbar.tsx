import { RowData, type Table } from "@tanstack/react-table";

import DataTableGlobalFilterInput from "./DataTableGlobalFilterInput";
import DataTableViewOptions from "./DataTableViewOptions";

interface DataTableToolbarProps<TData extends RowData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData extends RowData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableGlobalFilterInput table={table} />
      </div>
      <div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
