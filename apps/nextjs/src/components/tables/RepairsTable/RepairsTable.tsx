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
import RepairsTableStatusFilter from "./RepairsTableStatusFilter";

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
  } = api.repairs.getAll.useQuery(dataState);

  const { data: rowCount } = api.repairs.getCount.useQuery(countState);

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
      <DataTableToolbar
        ColumnFilter={<RepairsTableStatusFilter table={table} />}
        table={table}
      />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
