"use client";
import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function LocationsTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      updatedAt: false,
    },
  });

  const [locations] = api.locations.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.locations.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={locations}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
