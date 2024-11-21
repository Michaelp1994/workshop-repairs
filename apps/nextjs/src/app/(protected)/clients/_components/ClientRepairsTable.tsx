"use client";
import type { ClientID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import DataTable from "@repo/ui/data-table/DataTable";
import { useDataTableState } from "@repo/ui/hooks/use-data-table";

import { api } from "~/trpc/client";

import { columns } from "../../repairs/_components/RepairsTable/columns";

interface ClientRepairsTableProps {
  clientId: ClientID;
}

export default function ClientRepairsTable({
  clientId,
}: ClientRepairsTableProps) {
  const { dataState, countState, tableState } = useDataTableState();

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
