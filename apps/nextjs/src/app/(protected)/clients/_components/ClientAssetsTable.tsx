"use client";
import { Card, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface ClientAssetsTableProps {
  clientId: number;
}

export default function ClientAssetsTable({
  clientId,
}: ClientAssetsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [assets] = api.assets.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      clientId,
    },
  });

  const [rowCount] = api.assets.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      clientId,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <DataTable
        columns={columns}
        data={assets}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
