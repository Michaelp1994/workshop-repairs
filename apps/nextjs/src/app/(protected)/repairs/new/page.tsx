import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateRepairForm from "../_components/CreateRepairForm";
export default function CreateRepairPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Repair</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateRepairForm />
      </CardContent>
    </Card>
  );
}
