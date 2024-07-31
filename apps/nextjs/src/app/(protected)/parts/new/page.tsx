import CreatePartForm from "./CreatePartForm";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

export default function CreatePartPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Part</CardTitle>
      </CardHeader>
      <CardContent>
        <CreatePartForm />
      </CardContent>
    </Card>
  );
}
