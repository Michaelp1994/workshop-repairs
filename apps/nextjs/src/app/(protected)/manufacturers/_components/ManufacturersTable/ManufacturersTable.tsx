"use client";
import { Card } from "@repo/ui/card";
import { useDataTableState } from "@repo/ui/data-table";
import DataTable from "@repo/ui/data-table/DataTable";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function ManufacturersTable() {
  const { dataState, countState, tableState } = useDataTableState();

  const [manufacturers] = api.manufacturers.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.manufacturers.getCount.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={manufacturers}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
