import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

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
        <CardTitle>Client Details</CardTitle>
        <CardDescription>Details about the client {clientId}</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateClientForm clientId={clientId} />
      </CardContent>
    </Card>
  );
}
