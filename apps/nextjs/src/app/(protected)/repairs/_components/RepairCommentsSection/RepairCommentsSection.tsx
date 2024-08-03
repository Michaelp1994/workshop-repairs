import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import CreateRepairCommentForm from "../CreateRepairCommentForm";
import RepairCommentsTable from "./RepairCommentsTable";

interface RepairCommentsSectionProps {
  repairId: RepairID;
}

export default function RepairCommentsSection({
  repairId,
}: RepairCommentsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <RepairCommentsTable repairId={repairId} />
      </CardContent>
      <CardFooter className="block border-t p-4">
        <CreateRepairCommentForm repairId={repairId} />
      </CardFooter>
    </Card>
  );
}
