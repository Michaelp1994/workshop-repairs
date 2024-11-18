import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateClientForm from "../UpdateClientForm";

interface ClientDetailsSectionProps {
  clientId: number;
}

export default function ClientDetailsSection({
  clientId,
}: ClientDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Client</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateClientForm clientId={clientId} />
      </CardContent>
    </Card>
  );
}
