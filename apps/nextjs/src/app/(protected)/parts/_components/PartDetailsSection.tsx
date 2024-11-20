"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import { api } from "~/trpc/client";

interface PartDetailsSectionProps {
  partId: number;
}

export default function PartDetailsSection({
  partId,
}: PartDetailsSectionProps) {
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
        </DetailsList>
      </CardContent>
    </Card>
  );
}