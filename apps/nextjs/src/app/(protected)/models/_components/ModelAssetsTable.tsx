"use client";
import { Card, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type ModelID } from "@repo/validators/ids.validators";

import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface ModelAssetsTableProps {
  modelId: ModelID;
}

export default function ModelAssetsTable({ modelId }: ModelAssetsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [assets] = api.assets.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      modelId,
    },
  });

  const [rowCount] = api.assets.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      modelId,
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
