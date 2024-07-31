import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import UpdateAssetForm from "./UpdateAssetForm";
import { type AssetID } from "@repo/validators/ids.validators";

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
        <CardDescription>General details about the asset.</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateAssetForm assetId={assetId} />
      </CardContent>
    </Card>
  );
}
