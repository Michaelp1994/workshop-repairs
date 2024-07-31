import CreateRepairForm from "./CreateRepairForm";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
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
