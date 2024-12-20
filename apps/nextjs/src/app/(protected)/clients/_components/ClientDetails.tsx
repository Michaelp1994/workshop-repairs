"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/app/(protected)/_components/MetadataFields";
import { api } from "~/trpc/client";

interface ClientDetailsProps {
  clientId: number;
}

export default function ClientDetails({ clientId }: ClientDetailsProps) {
  const [client] = api.clients.getById.useSuspenseQuery({ id: clientId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{client.name}</DetailsValue>
          <MetadataFields metadata={client} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
