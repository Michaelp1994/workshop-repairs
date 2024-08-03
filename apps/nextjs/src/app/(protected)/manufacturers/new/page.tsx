import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateManufacturerForm from "../_components/CreateManufacturerForm";

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
