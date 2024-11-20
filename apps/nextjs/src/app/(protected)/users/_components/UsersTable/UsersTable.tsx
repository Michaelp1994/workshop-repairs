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

export default function UsersTable() {
  const { dataState, countState, tableState } = useDataTableState();

  const [users] = api.users.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.users.getCount.useSuspenseQuery(countState);
  const table = useDataTable({
    columns,
    data: users,
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