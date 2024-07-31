import {
  type OnChangeFn,
  type RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { api } from "~/trpc/react";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import {
  type ColumnsInput,
  type FilterInput,
  type PaginationInput,
  type SortingInput,
} from "@repo/validators/types";
import { type SortingState } from "@tanstack/react-table";
import { type ModelID } from "@repo/validators/ids.validators";
import { type PartsToModelsColumns } from "@repo/validators/partsToModel.validators";

interface UseModelToPartsTableInput {
  modelId: ModelID;
}

export function useModelToPartsTable({ modelId }: UseModelToPartsTableInput) {
  const [pagination, setPagination] = useState<PaginationInput>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingInput<PartsToModelsColumns>>(
    [],
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<FilterInput>("");
  const debounceGlobalFilter = useDebounce(globalFilter, 300);
  const [columnVisibility, setColumnVisibility] = useState<
    ColumnsInput<PartsToModelsColumns>
  >({
    part_name: true,
    part_partNumber: true,
    model_name: true,
    quantity: true,
  });

  const query = api.partsToModels.getAll.useQuery(
    {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      globalFilter: debounceGlobalFilter,
      sorting,
      columns: columnVisibility,
      filters: {
        modelId,
      },
    },
    {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  const { data: totalRows } = api.partsToModels.getCount.useQuery(
    {
      globalFilter: debounceGlobalFilter,
      columns: columnVisibility,
      filters: {
        modelId,
      },
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
    getRowId: (row) => row.partId.toString(),
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
