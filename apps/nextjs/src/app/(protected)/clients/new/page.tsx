import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateClientForm from "../_components/CreateClientForm";

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
