"use client";
import { Card } from "@repo/ui/card";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function LocationsTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const [locations] = api.locations.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.locations.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: locations,
    rowCount,
    ...tableOptions,
  });

  return (
    <Card>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </Card>
  );
}
