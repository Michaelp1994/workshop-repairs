import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";
import { type ModelID } from "@repo/validators/ids.validators";

import ModelPartsTable from "./ModelPartsTable";

interface ModelPartsSectionProps {
  modelId: ModelID;
}

export default function ModelPartsSection({ modelId }: ModelPartsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 1, pageSize: 5 },
    columnFilters: [{ id: "model_id", value: modelId }],
    columnVisibility: {
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
      manufacturer_name: false,
      model_name: false,
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts</CardTitle>
      </CardHeader>
      <CardContent>
        <ModelPartsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
