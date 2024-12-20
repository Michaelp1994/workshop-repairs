"use client";
import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function ModelsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  });

  const [models] = api.models.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.models.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={models}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
