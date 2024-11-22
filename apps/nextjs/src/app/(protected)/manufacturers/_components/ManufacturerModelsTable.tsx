"use client";
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
import { type ManufacturerID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../models/_components/ModelsTable/columns";

interface ManufacturerModelsTableProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerModelsTable({
  manufacturerId,
}: ManufacturerModelsTableProps) {
  const { dataState, countState, tableState } = useDataTableState({
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
    columns: {
      manufacturer: false,
      createdAt: false,
      updatedAt: false,
    },
  });

  const [models] = api.models.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      manufacturerId,
    },
  });

  const [rowCount] = api.models.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      manufacturerId,
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
            href={`/models/new?manufacturerId=${manufacturerId}`}
            size="sm"
            variant="create"
          >
            Add
          </IconButton>
        </CardHeaderActions>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={models}
          rowCount={rowCount}
          tableState={tableState}
        />
      </CardContent>
    </Card>
  );
}
