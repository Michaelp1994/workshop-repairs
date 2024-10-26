import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateModelForm from "../_components/CreateModelForm";

export default function CreateModelPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Model</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateModelForm />
      </CardContent>
    </Card>
  );
}
