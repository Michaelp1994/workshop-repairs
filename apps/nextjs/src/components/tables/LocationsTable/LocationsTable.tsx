"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import { keepPreviousData } from "@tanstack/react-query";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function LocationsTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const { data, isLoading, isError, error } = api.locations.getAll.useQuery(
    dataState,
    {
      placeholderData: keepPreviousData,
    },
  );

  const { data: rowCount } = api.locations.getCount.useQuery(countState, {
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
    return <div>Error loading locations</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
