import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import UpdateRepairForm from "./UpdateRepairForm";

interface RepairDetailsSectionProps {
  repairId: RepairID;
}

export default function RepairDetailsSection({
  repairId,
}: RepairDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Details</CardTitle>
        <CardDescription>Details about the repair</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateRepairForm repairId={repairId} />
      </CardContent>
    </Card>
  );
}
