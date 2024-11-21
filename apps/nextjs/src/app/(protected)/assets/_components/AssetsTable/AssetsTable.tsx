"use client";
import type { DataTableInput } from "@repo/validators/dataTables.validators";

import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function AssetsTable() {
  const initialState: DataTableInput = {
    globalFilter: "",
    columnFilters: [],
    columns: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
    sorting: [],
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
  };
  const { dataState, countState, tableState } = useDataTableState(initialState);

  const [allAssets] = api.assets.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.assets.getCount.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={allAssets}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
