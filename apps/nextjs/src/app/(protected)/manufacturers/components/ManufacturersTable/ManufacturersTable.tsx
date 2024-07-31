"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import { useManufacturersTable } from "./useManufacturersTable";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import {
  defaultCountQueryOptns,
  defaultDataQueryOptns,
} from "~/utils/defaultQueryOptns";

export default function ManufacturersTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const { data, isLoading, isError, error } = api.manufacturers.getAll.useQuery(
    dataState,
    defaultDataQueryOptns,
  );

  const { data: rowCount } = api.manufacturers.getCount.useQuery(
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
