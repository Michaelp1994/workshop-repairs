"use client";
import type { PartID } from "@repo/validators/ids.validators";

import {
  Card,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { IconButton } from "~/app/(protected)/_components/IconButton";
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

  const [rowCount] = api.partsToModels.countAllModelsByPartId.useSuspenseQuery({
    ...countState,
    filters: {
      partId,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Models</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            href={`/parts/${partId}/models/new`}
            scroll={false}
            variant="create"
          >
            Add
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <DataTable
        columns={columns}
        data={models}
        getRowId={(row) => row.modelId.toString()}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
