import CreateLocationForm from "./CreateLocationForm";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
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
