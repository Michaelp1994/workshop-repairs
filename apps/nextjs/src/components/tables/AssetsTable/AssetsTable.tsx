"use client";
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

interface AssetsTableProps {
  initialState: InitialDataTableState;
}

export default function AssetsTable({ initialState }: AssetsTableProps) {
  const { dataState, countState, tableOptions } =
    useDataTableState(initialState);

  const [allAssets] = api.assets.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.assets.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: allAssets,
    rowCount,
    ...tableOptions,
  });

  return (
    <>
      <DataTableToolbar table={table} />
      <DataTable className="rounded-md border" table={table} />
      <DataTableFooter table={table} />
    </>
  );
}
