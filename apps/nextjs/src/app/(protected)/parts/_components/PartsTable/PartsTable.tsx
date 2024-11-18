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

export default function PartsTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const [parts] = api.parts.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.parts.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: parts,
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
