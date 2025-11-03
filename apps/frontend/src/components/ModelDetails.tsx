import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface ModelDetailsProps {
  slug: string;
}

export default function ModelDetails({ slug }: ModelDetailsProps) {
  const [model] = api.models.getBySlug.useSuspenseQuery({ slug });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{model.name}</DetailsValue>
          <DetailsLabel>Equipment Type:</DetailsLabel>
          <DetailsValue>{model.equipmentType.name}</DetailsValue>
          <DetailsLabel>Manufacturer:</DetailsLabel>
          <DetailsValue>{model.manufacturer.name}</DetailsValue>
          <MetadataFields metadata={model} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
