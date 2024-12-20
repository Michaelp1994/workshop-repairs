"use client";
import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function ManufacturersTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      createdAt: false,
    },
  });

  const [manufacturers] = api.manufacturers.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.manufacturers.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={manufacturers}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
