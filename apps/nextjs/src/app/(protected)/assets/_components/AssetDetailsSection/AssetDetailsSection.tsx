import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { type AssetID } from "@repo/validators/ids.validators";

import UpdateAssetForm from "../UpdateAssetForm";

interface AssetDetailsSectionProps {
  assetId: AssetID;
}

export default function AssetDetailsSection({
  assetId,
}: AssetDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateAssetForm assetId={assetId} />
      </CardContent>
    </Card>
  );
}
