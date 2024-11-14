"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function ManufacturersTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const { data, isLoading, isError } = api.manufacturers.getAll.useQuery(
    dataState,
    {
      placeholderData: keepPreviousData,
    },
  );

  const { data: rowCount } = api.manufacturers.getCount.useQuery(countState, {
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
    return <div>Error loading manufacturers</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
