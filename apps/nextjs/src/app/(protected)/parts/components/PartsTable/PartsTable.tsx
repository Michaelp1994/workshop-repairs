"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  InitialDataTableState,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import { api } from "~/trpc/react";
import {
  defaultCountQueryOptns,
  defaultDataQueryOptns,
} from "~/utils/defaultQueryOptns";
import { columns } from "./columns";

interface PartsTableProps {
  initialState?: InitialDataTableState;
}

export default function PartsTable({ initialState }: PartsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.parts.getAll.useQuery(dataState, defaultDataQueryOptns);

  const { data: rowCount } = api.parts.getCount.useQuery(
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
    console.log(error);
    return <div>Error loading parts</div>;
  }

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
