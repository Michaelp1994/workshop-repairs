"use client";
import { api } from "~/trpc/react";
import RepairsTableStatusFilter from "./RepairsTableStatusFilter";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  type InitialDataTableState,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";
import {
  defaultCountQueryOptns,
  defaultDataQueryOptns,
} from "~/utils/defaultQueryOptns";
import { columns } from "./columns";

interface RepairsTableProps {
  initialState: InitialDataTableState;
}

export default function RepairsTable({ initialState }: RepairsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.repairs.getAll.useQuery(dataState, defaultDataQueryOptns);

  const { data: rowCount } = api.repairs.getCount.useQuery(
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
    console.error(error);
    return <div>Error loading repairs</div>;
  }

  return (
    <>
      <DataTableToolbar
        table={table}
        ColumnFilter={<RepairsTableStatusFilter table={table} />}
      />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
