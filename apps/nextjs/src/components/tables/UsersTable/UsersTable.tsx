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

export default function UsersTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.users.getAll.useQuery(dataState, {
    placeholderData: keepPreviousData,
  });

  const { data: rowCount } = api.users.getCount.useQuery(countState);

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
    return <div>Error loading repairs</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
