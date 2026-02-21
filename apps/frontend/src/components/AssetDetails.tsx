import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface AssetDetailsProps {
  slug: string;
}

export default function AssetDetails({ slug }: AssetDetailsProps) {
  const [asset] = api.assets.getBySlug.useSuspenseQuery({ slug });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Serial Number:</DetailsLabel>
          <DetailsValue>{asset.serialNumber}</DetailsValue>
          <DetailsLabel>Asset Number:</DetailsLabel>
          <DetailsValue>{asset.assetNumber}</DetailsValue>
          <DetailsLabel>Software Version:</DetailsLabel>
          <DetailsValue>{asset.softwareVersion}</DetailsValue>
          <DetailsLabel>Owned By:</DetailsLabel>
          <DetailsValue>{asset.client.name}</DetailsValue>
          <DetailsLabel>Location:</DetailsLabel>
          <DetailsValue>{asset.location.name}</DetailsValue>
          <DetailsLabel>Model:</DetailsLabel>
          <DetailsValue>{asset.model.name}</DetailsValue>
          <DetailsLabel>Manufacturer:</DetailsLabel>
          <DetailsValue>{asset.model.manufacturer}</DetailsValue>
          <DetailsLabel>Status:</DetailsLabel>
          <DetailsValue>{asset.status.name}</DetailsValue>
          <MetadataFields metadata={asset} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
