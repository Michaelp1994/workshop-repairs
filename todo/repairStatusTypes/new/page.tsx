import CreateRepairStatusTypeForm from "./CreateRepairStatusTypeForm";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
export default function CreateRepairStatusTypePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Repair Status Type</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateRepairStatusTypeForm />
      </CardContent>
    </Card>
  );
}
