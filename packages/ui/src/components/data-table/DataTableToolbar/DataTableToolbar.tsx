import { RowData, type Table } from "@tanstack/react-table";
import DataTableViewOptions from "./DataTableViewOptions";
import DataTableGlobalFilterInput from "./DataTableGlobalFilterInput";
import { ReactElement } from "react";

interface DataTableToolbarProps<TData extends RowData> {
  table: Table<TData>;
  ColumnFilter?: ReactElement;
}

export default function DataTableToolbar<TData extends RowData>({
  table,
  ColumnFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableGlobalFilterInput table={table} />
        {ColumnFilter}
      </div>
      <div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
