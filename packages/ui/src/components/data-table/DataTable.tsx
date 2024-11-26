import {
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableCore } from "./DataTableCore/DataTableCore";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";

type BaseData = Record<string, unknown>;

type RedactedTableOptions<TData extends BaseData> = Omit<
  TableOptions<TData>,
  "getCoreRowModel" | "manualPagination" | "manualSorting" | "manualFiltering"
>;

export default function DataTable<TData extends BaseData>({
  getRowId,
  rowCount,
  ...otherProps
}: RedactedTableOptions<TData>) {
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getRowId: getRowId
      ? getRowId
      : (row) => {
          if ("id" in row && typeof row["id"] === "number") {
            return row["id"].toString();
          }
          throw new Error(
            "getRowId must be provided if the row does not have an 'id' field",
          );
        },
    rowCount: rowCount ?? -1,
    ...otherProps,
  });

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTableCore table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
