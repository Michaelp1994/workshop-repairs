import type { DataTableInput } from "@repo/validators/dataTables.validators";

import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export function useDataTableState(initialState?: DataTableInput) {
  const init = {
    columnFilters: initialState?.columnFilters ?? [],
    columns: initialState?.columns ?? {},
    globalFilter: initialState?.globalFilter ?? "",
    sorting: initialState?.sorting ?? [],
    pagination: initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
  };
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>(init.pagination);

  const [sorting, setSorting] = useState<SortingState>(init.sorting);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>(init.globalFilter);
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    init.columns,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    init.columnFilters as ColumnFiltersState,
  );

  return {
    dataState: {
      pagination,
      globalFilter: debouncedGlobalFilter,
      columns: columnVisibility,
      columnFilters,
      sorting,
    },
    countState: {
      globalFilter: debouncedGlobalFilter,
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
