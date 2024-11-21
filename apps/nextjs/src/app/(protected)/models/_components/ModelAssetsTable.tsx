"use client";
import {
  Card,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import { type ModelID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface ModelAssetsTableProps {
  modelId: ModelID;
}

export default function ModelAssetsTable({ modelId }: ModelAssetsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      model: false,
      createdAt: false,
      updatedAt: false,
    },
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  });

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
        <CardHeaderText>
          <CardTitle>Assets</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            href={`/assets/new?modelId=${modelId}`}
            size="sm"
            variant="create"
          >
            Add
          </IconButton>
        </CardHeaderActions>
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
