"use client";
import { Card } from "@repo/ui/card";
import {
  DataTableCore,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { useDataTable, useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";
export default function ClientsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      updatedAt: false,
    },
  });

  const [allClients] = api.clients.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.clients.countAll.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: allClients,
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
