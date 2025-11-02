import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface ClientDetailsProps {
  clientSlug: string;
}

export default function ClientDetails({ clientSlug }: ClientDetailsProps) {
  const [client] = api.clients.getBySlug.useSuspenseQuery({ slug: clientSlug });
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
