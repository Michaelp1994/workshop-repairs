import {
  ColumnFiltersState,
  getCoreRowModel,
  RowSelectionState,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

export function useDataTableState(initial: DataTable) {
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  return {
    dataState: {
      pagination,
      globalFilter: globalFilter,
      columns: columnVisibility,
      columnFilters,
      sorting,
    },
    countState: {
      globalFilter: globalFilter,
      columnFilters,
      columns: columnVisibility,
    },
    tableState: {
      state: {
        columnVisibility,
        columnFilters,
        globalFilter,
        pagination,
        rowSelection,
        sorting,
      },
      onColumnFiltersChange: setColumnFilters,
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange: setGlobalFilter,
      onColumnVisibilityChange: setColumnVisibility,
      onSortingChange: setSorting,
    },
  };
}

interface BaseData {
  id: number;
  [key: string]: unknown;
}

type RedactedTableOptions<TData extends BaseData> = Omit<
  TableOptions<TData>,
  "getCoreRowModel" | "manualPagination" | "manualSorting" | "manualFiltering"
>;

export function useDataTable<TData extends BaseData>({
  rowCount,
  getRowId,
  ...otherProps
}: RedactedTableOptions<TData>) {
  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getRowId: getRowId ? getRowId : (row) => row["id"].toString(),
    rowCount: rowCount ?? -1,
    ...otherProps,
  });
}
