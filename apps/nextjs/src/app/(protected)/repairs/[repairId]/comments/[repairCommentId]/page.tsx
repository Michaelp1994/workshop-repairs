import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import UpdateRepairCommentForm from "../../../_components/UpdateRepairCommentForm";

interface ViewRepairCommentPageProps {
  params: {
    repairId: string;
    repairCommentId: string;
  };
}

export default function ViewRepairCommentPage({
  params,
}: ViewRepairCommentPageProps) {
  const repairId = Number(params.repairId);
  const repairCommentId = Number(params.repairCommentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Repair Comment</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateRepairCommentForm repairCommentId={repairCommentId} />
      </CardContent>
    </Card>
  );
}
