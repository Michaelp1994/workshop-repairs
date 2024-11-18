import type { InitialDataTableState } from "@repo/ui/data-table";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import AssetsTable from "~/components/tables/AssetsTable";
import { api } from "~/trpc/server";

interface ClientAssetsSectionProps {
  clientId: number;
}

export default async function ClientAssetsSection({
  clientId,
}: ClientAssetsSectionProps) {
  const client = await api.clients.getById({ id: clientId });
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
        <CardTitle>Assets</CardTitle>
      </CardHeader>

      <CardContent>
        <AssetsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
