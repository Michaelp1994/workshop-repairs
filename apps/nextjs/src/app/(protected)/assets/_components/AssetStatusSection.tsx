import type { AssetID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateAssetStatusForm from "./UpdateAssetStatusForm";

interface AssetStatusSectionProps {
  assetId: AssetID;
}

export default function AssetStatusSection({
  assetId,
}: AssetStatusSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateAssetStatusForm assetId={assetId} />
      </CardContent>
    </Card>
  );
}
