import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import UpdateRepairPartForm from "../../../_components/UpdateRepairPartForm";

interface UpdateRepairPartModalProps {
  params: {
    repairId: string;
    repairPartId: string;
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
        <UpdateRepairPartForm repairId={repairId} repairPartId={repairPartId} />
      </CardContent>
    </Card>
  );
}