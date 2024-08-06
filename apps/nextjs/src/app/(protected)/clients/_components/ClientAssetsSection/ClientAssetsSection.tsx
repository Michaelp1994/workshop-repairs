import type { InitialDataTableState } from "@repo/ui/data-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import AssetsTable from "~/components/tables/AssetsTable";

interface ClientAssetsSectionProps {
  clientId: number;
}

export default function ClientAssetsSection({
  clientId,
}: ClientAssetsSectionProps) {
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
        <CardDescription>
          Assets associated with client {clientId}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AssetsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
