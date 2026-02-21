import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface ManufacturerDetailsProps {
  slug: string;
}

export default function ManufacturerDetails({
  slug,
}: ManufacturerDetailsProps) {
  const [manufacturer] = api.manufacturers.getBySlug.useSuspenseQuery({
    slug,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manufacturer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{manufacturer.name}</DetailsValue>
          <MetadataFields metadata={manufacturer} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
