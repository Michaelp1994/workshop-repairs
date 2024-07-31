import type { RepairID, RepairPartID } from "@repo/validators/ids.validators";
import UpdateRepairPartForm from "./UpdateRepairPartForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

interface UpdateRepairPartModalProps {
  params: {
    repairId: RepairID;
    repairPartId: RepairPartID;
  };
}

export default function UpdateRepairPartModal({
  params,
}: UpdateRepairPartModalProps) {
  const repairId = Number(params.repairId);
  const repairPartId = Number(params.repairPartId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Repair Part</CardTitle>
        <CardDescription>
          Add a repair part to repair {repairId}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateRepairPartForm repairId={repairId} />
      </CardContent>
    </Card>
  );
}
