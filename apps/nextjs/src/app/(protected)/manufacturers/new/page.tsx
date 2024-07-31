import CreateManufacturerForm from "./CreateManufacturerForm";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";

export default function CreateManufacturerPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Manufacturer</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateManufacturerForm />
        </CardContent>
      </Card>
    </div>
  );
}
