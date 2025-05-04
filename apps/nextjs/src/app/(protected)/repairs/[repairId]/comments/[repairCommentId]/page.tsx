import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import UpdateRepairCommentForm from "../../../_components/UpdateRepairCommentForm";

interface ViewRepairCommentPageProps {
  params: Promise<{
    repairId: string;
    repairCommentId: string;
  }>;
}

export default async function ViewRepairCommentPage(
  props: ViewRepairCommentPageProps,
) {
  const params = await props.params;
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
