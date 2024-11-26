"use client";

import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function AssetsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  });

  const [allAssets] = api.assets.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.assets.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={allAssets}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
