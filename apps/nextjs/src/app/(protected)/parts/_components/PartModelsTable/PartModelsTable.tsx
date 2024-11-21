"use client";
import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

interface PartModelsTableProps {
  partId: PartID;
}

export default function PartModelsTable({ partId }: PartModelsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [models] = api.partsToModels.getAllModelsByPartId.useSuspenseQuery({
    ...dataState,
    filters: {
      partId,
    },
  });

  const [rowCount] = api.partsToModels.getCountModelsByPartId.useSuspenseQuery({
    ...countState,
    filters: {
      partId,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <DataTable
        columns={columns}
        data={models}
        getRowId={(row) => row.modelId.toString()}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
