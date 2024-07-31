import CreateClientForm from "./CreateClientForm";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";

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
