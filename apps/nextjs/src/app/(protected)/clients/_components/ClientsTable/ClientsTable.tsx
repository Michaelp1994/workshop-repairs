"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/react";
import {
  defaultCountQueryOptns,
  defaultDataQueryOptns,
} from "~/utils/defaultQueryOptns";

import { columns } from "./columns";
export default function ClientsTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.clients.getAll.useQuery(dataState, defaultDataQueryOptns);

  const { data: rowCount } = api.clients.getCount.useQuery(
    countState,
    defaultCountQueryOptns,
  );

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
    return <div>Error loading clients</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
