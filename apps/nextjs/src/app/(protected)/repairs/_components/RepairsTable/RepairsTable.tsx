"use client";
import type { DataTableInput } from "@repo/validators/dataTables.validators";

import { Card } from "@repo/ui/card";
import {
  DataTableCore,
  DataTableFooter,
  DataTableToolbar,
} from "@repo/ui/data-table";
import { useDataTable, useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function RepairsTable() {
  const initialState: DataTableInput = {
    columnFilters: [],
    columns: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
    globalFilter: "",
    sorting: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  };
  const { dataState, countState, tableState } = useDataTableState(initialState);

  const [allRepairs] = api.repairs.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.repairs.getCount.useSuspenseQuery(countState);

  const table = useDataTable({
    columns,
    data: allRepairs,
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
