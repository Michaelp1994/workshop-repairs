"use client";
import type { ClientID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../repairs/_components/RepairsTable/columns";

interface ClientRepairsSectionProps {
  clientId: ClientID;
}

export default function ClientRepairsSection({
  clientId,
}: ClientRepairsSectionProps) {
  const { dataState, countState, tableState } = useDataTableState();

  const [repairs] = api.repairs.getAll.useSuspenseQuery({
    ...dataState,
    filters: {
      clientId,
    },
  });

  const [rowCount] = api.repairs.getCount.useSuspenseQuery({
    ...countState,
    filters: {
      clientId,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repairs</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={repairs}
          rowCount={rowCount}
          tableState={tableState}
        />
      </CardContent>
    </Card>
  );
}
