"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type ModelID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "./columns";

interface ModelPartsTableProps {
  modelId: ModelID;
}

export default function ModelPartsTable({ modelId }: ModelPartsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  });

  const [parts] = api.partsToModels.getAllPartsByModelId.useSuspenseQuery({
    ...dataState,
    filters: {
      modelId,
    },
  });

  const [rowCount] = api.partsToModels.countAllPartsByModelId.useSuspenseQuery({
    ...countState,
    filters: {
      modelId,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parts</CardTitle>
        <IconButton
          href={`/models/${modelId}/parts/new`}
          scroll={false}
          variant="create"
        >
          Add
        </IconButton>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={parts}
          getRowId={(row) => row.partId.toString()}
          rowCount={rowCount}
          {...tableState}
        />
      </CardContent>
    </Card>
  );
}
