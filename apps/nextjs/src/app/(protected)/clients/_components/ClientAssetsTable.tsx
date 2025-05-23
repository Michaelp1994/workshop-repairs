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

import { IconButton } from "~/app/(protected)/_components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface ClientAssetsTableProps {
  clientId: number;
}

export default function ClientAssetsTable({
  clientId,
}: ClientAssetsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      createdAt: false,
      assetNumber: false,
      updatedAt: false,
      client: false,
    },
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  });

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
        <CardHeaderText>
          <CardTitle>Assets</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            href={`/assets/new?clientId=${clientId}`}
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
        {...tableState}
      />
    </Card>
  );
}
