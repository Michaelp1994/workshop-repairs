"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import { api } from "~/trpc/client";

interface ClientDetailsSectionProps {
  clientId: number;
}

export default function ClientDetailsSection({
  clientId,
}: ClientDetailsSectionProps) {
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
        </DetailsList>
      </CardContent>
    </Card>
  );
}
