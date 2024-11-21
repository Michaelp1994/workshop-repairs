import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { type RepairID } from "@repo/validators/ids.validators";

import CreateRepairPartModal from "./CreateRepairPartModal";
import RepairPartsTable from "./RepairPartsTable";

interface RepairPartsProps {
  repairId: RepairID;
}

export default function RepairParts({ repairId }: RepairPartsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts</CardTitle>
      </CardHeader>
      <CardContent>
        <RepairPartsTable repairId={repairId} />
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <CreateRepairPartModal repairId={repairId} />
      </CardFooter>
    </Card>
  );
}
