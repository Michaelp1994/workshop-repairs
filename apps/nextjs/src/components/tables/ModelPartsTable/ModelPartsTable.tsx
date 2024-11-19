"use client";
import { Card } from "@repo/ui/card";
import {
  DataTableCore,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function PartsTable() {
  const { dataState, countState, tableState } = useDataTableState();

  const [modelParts] = api.partsToModels.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.partsToModels.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: modelParts,
    getRowId: (row, index) => index.toString(),
    rowCount,
    ...tableState,
  });

  return (
    <Card>
      <DataTableToolbar table={table} />
      <DataTableCore table={table} />
      <DataTableFooter table={table} />
    </Card>
  );
}
