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

interface ModelsTableProps {
  initialState: InitialDataTableState;
}

export default function ModelsTable({ initialState }: ModelsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const [models] = api.models.getAll.useSuspenseQuery(dataState, {});

  const [rowCount] = api.models.getCount.useSuspenseQuery(countState, {});

  const table = useDataTable({
    columns,
    data: models,
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
