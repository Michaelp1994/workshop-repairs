import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateLocationForm from "./CreateLocationForm";
export default function CreateLocationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Location</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateLocationForm />
      </CardContent>
    </Card>
  );
}
