"use client";
import {
  DataTable,
  DataTableFooter,
  DataTableToolbar,
  useDataTable,
  useDataTableState,
} from "@repo/ui/data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function UsersTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const [users] = api.users.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.users.getCount.useSuspenseQuery(countState);
  const table = useDataTable({
    columns,
    data: users,
    rowCount,
    ...tableOptions,
  });

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
