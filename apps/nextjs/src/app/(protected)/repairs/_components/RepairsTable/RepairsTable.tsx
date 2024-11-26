"use client";

import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function RepairsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
    },
  });

  const [allRepairs] = api.repairs.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.repairs.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={allRepairs}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
