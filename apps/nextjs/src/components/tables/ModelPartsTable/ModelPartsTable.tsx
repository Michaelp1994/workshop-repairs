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

  const [modelParts] = api.partsToModels.getAll.useSuspenseQuery(dataState, {});

  const [rowCount] = api.partsToModels.getCount.useSuspenseQuery(
    countState,
    {},
  );

  const table = useDataTable({
    columns,
    data: modelParts,
    getRowId: (row, index) => index.toString(),
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
