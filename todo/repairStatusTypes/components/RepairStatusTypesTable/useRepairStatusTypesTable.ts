import {
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { api } from "~/trpc/client";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { type ColumnsInput, type SortingInput } from "@repo/validators/types";
import { type RepairStatusTypeColumns } from "@repo/validators/repairStatusTypes.validators";
import { type SortingState } from "@tanstack/react-table";

export function useRepairStatusTypesTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [sorting, setSorting] = useState<SortingInput<RepairStatusTypeColumns>>(
    [],
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const debounceGlobalFilter = useDebounce(globalFilter, 300);
  const [columnVisibility, setColumnVisibility] = useState<
    ColumnsInput<RepairStatusTypeColumns>
  >({
    name: true,
    createdAt: false,
    updatedAt: false,
  });

  const query = api.repairStatusTypes.getAll.useQuery(
    {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      globalFilter: debounceGlobalFilter,
      sorting,
      columns: columnVisibility,
    },
    {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  const { data: totalRows } = api.repairStatusTypes.getCount.useQuery(
    {
      globalFilter: debounceGlobalFilter,
      columns: columnVisibility,
    },
    {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
  const table = useReactTable({
    data: query.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: totalRows ?? -1,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id.toString(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    state: {
      pagination,
      rowSelection,
      globalFilter,
      columnVisibility,
      sorting,
    },
  });

  return {
    table,
    ...query,
  };
}
