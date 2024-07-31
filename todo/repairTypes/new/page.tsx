import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import CreateRepairTypeForm from "./CreateRepairTypeForm";

export default function CreateRepairTypePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Repair Type</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateRepairTypeForm />
      </CardContent>
    </Card>
  );
}
