"use client";
import type { EquipmentTypeID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../assets/_components/AssetsTable/columns";

interface EquipmentTypeAssetsSectionProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function EquipmentTypeAssetsSection({
  equipmentTypeId,
}: EquipmentTypeAssetsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [assets] = api.assets.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      equipmentTypeId,
    },
  });

  const [rowCount] = api.assets.countAll.useSuspenseQuery({
    ...countState,
    filters: {
      equipmentTypeId,
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={assets}
          rowCount={rowCount}
          tableState={tableState}
        />
      </CardContent>
    </Card>
  );
}
