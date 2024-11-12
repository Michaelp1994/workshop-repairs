import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateEquipmentTypeForm from "../_components/CreateEquipmentTypeForm";

export default function CreateEquipmentTypePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Equipment Type</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateEquipmentTypeForm />
      </CardContent>
    </Card>
  );
}
