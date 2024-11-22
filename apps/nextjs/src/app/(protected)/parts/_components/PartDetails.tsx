"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface PartDetailsProps {
  partId: number;
}

export default function PartDetails({ partId }: PartDetailsProps) {
  const [part] = api.parts.getById.useSuspenseQuery({ id: partId });
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
          <MetadataFields metadata={part} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
