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

export default function AssetsTable() {
  const { dataState, countState, tableOptions } = useDataTableState();

  const [allAssets] = api.assets.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.assets.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: allAssets,
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
