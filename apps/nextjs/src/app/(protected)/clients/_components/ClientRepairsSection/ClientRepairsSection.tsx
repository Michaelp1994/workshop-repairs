import type { InitialDataTableState } from "@repo/ui/data-table";
import type { ClientID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import RepairsTable from "~/components/tables/RepairsTable";

interface ClientRepairsSectionProps {
  clientId: ClientID;
}

export default function ClientRepairsSection({
  clientId,
}: ClientRepairsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
    columnFilters: [{ id: "client_id", value: clientId }],
    columnVisibility: {
      image: false,
      serialNumber: true,
      status: true,
      location: true,
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
      manufacturer: false,
      model: false,
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repairs</CardTitle>
        <CardDescription>All repairs for this client.</CardDescription>
      </CardHeader>
      <CardContent>
        <RepairsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
