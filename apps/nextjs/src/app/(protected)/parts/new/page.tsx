import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreatePartForm from "../_components/CreatePartForm";

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
