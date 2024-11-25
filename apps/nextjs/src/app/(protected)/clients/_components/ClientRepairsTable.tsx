"use client";
import type { ClientID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderActions,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../repairs/_components/RepairsTable/columns";

interface ClientRepairsTableProps {
  clientId: ClientID;
}

export default function ClientRepairsTable({
  clientId,
}: ClientRepairsTableProps) {
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

  const [repairs] = api.repairs.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      clientId,
    },
  });

  const [rowCount] = api.repairs.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      clientId,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Repairs</CardTitle>
        </CardHeaderText>
        <CardHeaderActions>
          <IconButton
            href={`/repairs/new?clientId=${clientId}`}
            size="sm"
            variant="create"
          >
            Add
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <DataTable
        columns={columns}
        data={repairs}
        rowCount={rowCount}
        tableState={tableState}
      />
    </Card>
  );
}
