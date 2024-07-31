import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateClientForm from "./CreateClientForm";

export default function CreateClientPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Client</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateClientForm />
      </CardContent>
    </Card>
  );
}
