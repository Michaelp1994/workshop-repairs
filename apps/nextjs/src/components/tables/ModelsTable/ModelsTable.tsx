"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  type InitialDataTableState,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

interface ModelsTableProps {
  initialState: InitialDataTableState;
}

export default function ModelsTable({ initialState }: ModelsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const {
    data = [],
    isLoading,
    isError,
  } = api.models.getAll.useQuery(dataState, {
    placeholderData: keepPreviousData,
  });

  const { data: rowCount } = api.models.getCount.useQuery(countState, {
    placeholderData: keepPreviousData,
  });

  const table = useDataTable({
    columns,
    data,
    rowCount,
    ...tableOptions,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading models</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
