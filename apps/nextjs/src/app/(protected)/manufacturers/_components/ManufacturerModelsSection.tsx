"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";
import DataTable from "@repo/ui/data-table/DataTable";

import { api } from "~/trpc/client";

import { columns } from "../../models/_components/ModelsTable/columns";

interface ManufacturerModelsSectionProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerModelsSection({
  manufacturerId,
}: ManufacturerModelsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [models] = api.models.getAllByManufacturerId.useSuspenseQuery({
    ...dataState,
    manufacturerId,
  });

  const [rowCount] = api.models.getCountByManufacturerId.useSuspenseQuery({
    ...countState,
    manufacturerId,
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
