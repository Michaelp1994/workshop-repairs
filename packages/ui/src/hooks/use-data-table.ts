import type { DataTableInput } from "@repo/validators/client/dataTables.schema";
import type {
  DataTableCountInput,
  DataTableInput as ServerDataTableInput,
} from "@repo/validators/server/dataTables.validators";

import {
  ColumnFiltersState,
  PaginationState,
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
  const [pagination, setPagination] = useState<PaginationState>(
    init.pagination,
  );

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

  const dataState: ServerDataTableInput = {
    pagination,
    globalFilter: debouncedGlobalFilter,
    columnFilters,
    sorting,
  };

  const countState: DataTableCountInput = {
    globalFilter: debouncedGlobalFilter,
    columnFilters,
  };

  return {
    dataState,
    countState,
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
