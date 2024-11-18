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

interface ModelPartsTable {
  initialState?: InitialDataTableState;
}

export default function PartModelsTable({ initialState }: ModelPartsTable) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const [partModels] = api.partsToModels.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.partsToModels.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: partModels,
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
