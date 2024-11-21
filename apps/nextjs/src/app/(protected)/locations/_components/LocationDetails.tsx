"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface LocationDetailsProps {
  locationId: number;
}

export default function LocationDetails({ locationId }: LocationDetailsProps) {
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
          <MetadataFields metadata={location} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
