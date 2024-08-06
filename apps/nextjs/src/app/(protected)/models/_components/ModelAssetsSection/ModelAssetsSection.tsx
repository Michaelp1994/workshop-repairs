import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";
import { type ModelID } from "@repo/validators/ids.validators";

import AssetsTable from "~/components/tables/AssetsTable";

interface ModelAssetsSectionProps {
  modelId: ModelID;
}

export default function ModelAssetsSection({
  modelId,
}: ModelAssetsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
    columnFilters: [{ id: "model_id", value: modelId }],
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
