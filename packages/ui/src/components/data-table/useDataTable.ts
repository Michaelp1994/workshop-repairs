import {
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { type ChangeEvent, useState } from "react";

export interface InitialDataTableState {
  pagination?: PaginationState;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  globalFilter?: string;
  columnVisibility?: VisibilityState;
  columnFilters?: ColumnFiltersState;
}

export function useDataTableState(initialData?: InitialDataTableState) {
  const init = {
    pagination: initialData?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
    sorting: initialData?.sorting ?? [],
    rowSelection: initialData?.rowSelection ?? {},
    globalFilter: initialData?.globalFilter ?? "",
    columnVisibility: initialData?.columnVisibility ?? {},
    columnFilters: initialData?.columnFilters ?? [],
  }; // TODO: refactor. ugly.

  const [pageIndex, setPageIndex] = useQueryState<number>(
    "p",
    parseAsInteger.withDefault(init.pagination.pageIndex),
  );
  const [pageSize, setPageSize] = useQueryState<number>(
    "n",
    parseAsInteger.withDefault(init.pagination.pageSize),
  );

  const pagination = {
    pageIndex,
    pageSize,
  };
  const setPagination = (
    newPagination: React.Dispatch<React.SetStateAction<PaginationState>>,
  ) => {
    console.log({ newPagination });
    setPageIndex(newPagination(pagination).pageIndex);
    setPageSize(newPagination(pagination).pageSize);
  };
  const [sorting, setSorting] = useState<SortingState>(init.sorting);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    init.rowSelection,
  );
  const [globalFilter, setGlobalFilter] = useQueryState<string>(
    "gf",
    parseAsString.withDefault(init.globalFilter),
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    init.columnVisibility,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    init.columnFilters,
  );

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
    tableOptions: {
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

// interface BaseData {
//   // id: number;
// }

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
