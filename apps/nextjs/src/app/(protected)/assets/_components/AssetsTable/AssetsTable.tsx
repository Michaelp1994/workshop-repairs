"use client";
import { Card } from "@repo/ui/card";
import { useDataTableState } from "@repo/ui/data-table";
import DataTable from "@repo/ui/data-table/DataTable";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function AssetsTable() {
  const { dataState, countState, tableState } = useDataTableState();

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
