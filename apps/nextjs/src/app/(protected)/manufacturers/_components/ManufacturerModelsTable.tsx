"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../models/_components/ModelsTable/columns";

interface ManufacturerModelsTableProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerModelsTable({
  manufacturerId,
}: ManufacturerModelsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

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
