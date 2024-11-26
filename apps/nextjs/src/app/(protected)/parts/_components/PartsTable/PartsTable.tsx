"use client";
import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function PartsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      updatedAt: false,
    },
  });

  const [parts] = api.parts.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.parts.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={parts}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
