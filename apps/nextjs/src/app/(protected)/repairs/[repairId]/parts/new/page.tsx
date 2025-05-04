import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import CreateRepairPartForm from "../../../_components/CreateRepairPartForm";

interface CreateRepairPartModalProps {
  params: Promise<{
    repairId: RepairID;
  }>;
}

export default async function CreateRepairPartModal(
  props: CreateRepairPartModalProps,
) {
  const params = await props.params;
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
