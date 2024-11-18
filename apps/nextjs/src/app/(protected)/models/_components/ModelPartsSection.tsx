import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import { type ModelID } from "@repo/validators/ids.validators";
import Link from "next/link";

import ModelPartsTable from "~/components/tables/ModelPartsTable";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ModelPartsSectionProps {
  modelId: ModelID;
}

export default function ModelPartsSection({ modelId }: ModelPartsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parts</CardTitle>
        <Button asChild size="icon" variant="link">
          <Link href={`${getBaseUrl()}/models/${modelId}/parts/new`}>
            <PlusCircle />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ModelPartsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
