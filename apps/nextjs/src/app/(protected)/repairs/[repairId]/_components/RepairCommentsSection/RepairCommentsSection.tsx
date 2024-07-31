"use client";
import type { RepairID } from "@repo/validators/ids.validators";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import CreateRepairCommentForm from "./CreateRepairCommentForm";
import { RepairComment } from "./RepairComment";
import { api } from "~/trpc/react";

interface RepairPartsTableProps {
  repairId: RepairID;
}

export default function RepairCommentsTable({
  repairId,
}: RepairPartsTableProps) {
  const { data, isLoading, isError } =
    api.repairComments.getAllByRepairId.useQuery({ repairId });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading repairs</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="align-center flex gap-4">
          Comments
          <Badge>{data.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CreateRepairCommentForm repairId={repairId} />
        {data.map((comment) => (
          <RepairComment key={comment.id} comment={comment} />
        ))}
      </CardContent>
    </Card>
  );
}
