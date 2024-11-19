"use client";
import type { EquipmentTypeID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { useDataTableState } from "@repo/ui/data-table";
import DataTable from "@repo/ui/data-table/DataTable";

import { api } from "~/trpc/client";

import { columns } from "../../models/_components/ModelsTable/columns";

interface EquipmentTypeModelsSectionProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function EquipmentTypeModelsTable({
  equipmentTypeId,
}: EquipmentTypeModelsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [models] = api.models.getAllByEquipmentTypeId.useSuspenseQuery({
    ...dataState,
    equipmentTypeId,
  });

  const [rowCount] = api.models.getCountByEquipmentTypeId.useSuspenseQuery({
    ...countState,
    equipmentTypeId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
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
