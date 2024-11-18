"use client";
import { Card } from "@repo/ui/card";
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

  const [allRepairs] = api.repairs.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.repairs.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: allRepairs,
    rowCount,
    ...tableOptions,
  });

  return (
    <Card>
      <DataTableToolbar
        ColumnFilter={<RepairsTableStatusFilter table={table} />}
        table={table}
      />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </Card>
  );
}
