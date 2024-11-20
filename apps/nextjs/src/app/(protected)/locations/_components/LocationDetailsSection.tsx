"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import { api } from "~/trpc/client";

interface LocationDetailsSectionProps {
  locationId: number;
}

export default function LocationDetailsSection({
  locationId,
}: LocationDetailsSectionProps) {
  const [location] = api.locations.getById.useSuspenseQuery({ id: locationId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{location.name}</DetailsValue>
        </DetailsList>
      </CardContent>
    </Card>
  );
}
