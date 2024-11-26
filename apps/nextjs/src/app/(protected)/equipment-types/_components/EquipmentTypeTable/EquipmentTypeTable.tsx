"use client";
import { Card } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "./columns";

export default function EquipmentTypeTable() {
  const { dataState, countState, tableState } = useDataTableState({
    columns: {
      updatedAt: false,
    },
  });

  const [allEquipmentTypes] =
    api.equipmentTypes.getAll.useSuspenseQuery(dataState);

  const [rowCount] = api.equipmentTypes.countAll.useSuspenseQuery(countState);

  return (
    <Card>
      <DataTable
        columns={columns}
        data={allEquipmentTypes}
        rowCount={rowCount}
        {...tableState}
      />
    </Card>
  );
}
