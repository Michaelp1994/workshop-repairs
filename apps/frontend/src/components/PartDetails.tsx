import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface PartDetailsProps {
  slug: string;
}

export default function PartDetails({ slug }: PartDetailsProps) {
  const [part] = api.parts.getBySlug.useSuspenseQuery({ slug });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Part Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{part.name}</DetailsValue>
          <DetailsLabel>Part Number:</DetailsLabel>
          <DetailsValue>{part.partNumber}</DetailsValue>
          <DetailsLabel>Part Description:</DetailsLabel>
          <DetailsValue>{part.description}</DetailsValue>
          <MetadataFields metadata={part} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
