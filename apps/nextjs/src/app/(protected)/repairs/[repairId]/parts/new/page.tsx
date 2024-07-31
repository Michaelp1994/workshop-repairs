import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import CreateRepairPartForm from "./CreateRepairPartForm";

interface CreateRepairPartModalProps {
  params: {
    repairId: RepairID;
  };
}

export default function CreateRepairPartModal({
  params,
}: CreateRepairPartModalProps) {
  const repairId = Number(params.repairId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Part</CardTitle>
        <CardDescription>Add a part to repair {repairId}</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateRepairPartForm repairId={repairId} />
      </CardContent>
    </Card>
  );
}
