"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  type InitialDataTableState,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import { keepPreviousData } from "@tanstack/react-query";

import { api } from "~/trpc/client";

import { columns } from "./columns";

interface AssetsTableProps {
  initialState: InitialDataTableState;
}

export default function AssetsTable({ initialState }: AssetsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.assets.getAll.useQuery(dataState, {
    placeholderData: keepPreviousData,
  });

  const { data: rowCount } = api.assets.getCount.useQuery(countState, {
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
    console.log(error);
    return <div>Error loading assets</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
