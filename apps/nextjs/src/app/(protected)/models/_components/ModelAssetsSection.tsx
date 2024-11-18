import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type ModelID } from "@repo/validators/ids.validators";

import AssetsTable from "~/app/(protected)/assets/_components/AssetsTable";

interface ModelAssetsSectionProps {
  modelId: ModelID;
}

export default function ModelAssetsSection({
  modelId,
}: ModelAssetsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable />
      </CardContent>
    </Card>
  );
}
