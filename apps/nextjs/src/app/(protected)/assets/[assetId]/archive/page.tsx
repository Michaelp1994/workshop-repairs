import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import { BackButton } from "~/components/BackButton";

import ArchiveAssetButton from "../../_components/ArchiveAssetButton";

interface ArchiveAssetPageProps {
  params: Promise<{
    assetId: string;
  }>;
}

export default async function ArchiveAssetPage(props: ArchiveAssetPageProps) {
  const params = await props.params;
  const assetId = Number(params.assetId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Confirm Archive</CardTitle>
          <CardDescription>
            Are you sure you wish to archive this item?
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>This asset will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveAssetButton assetId={assetId}>
          Yes, I am sure
        </ArchiveAssetButton>
      </CardFooter>
    </Card>
  );
}
