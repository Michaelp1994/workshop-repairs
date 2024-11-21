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
import { type EquipmentTypeID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import { api } from "~/trpc/client";

import { columns } from "../../models/_components/ModelsTable/columns";

interface EquipmentTypeModelsTableProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function EquipmentTypeModelsTable({
  equipmentTypeId,
}: EquipmentTypeModelsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [models] = api.models.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      equipmentTypeId,
    },
  });

  const [rowCount] = api.models.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      equipmentTypeId,
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
            href={`/models/new?equipmentTypeId=${equipmentTypeId}`}
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
