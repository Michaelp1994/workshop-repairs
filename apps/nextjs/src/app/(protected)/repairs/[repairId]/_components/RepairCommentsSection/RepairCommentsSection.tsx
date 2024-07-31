"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Badge } from "@repo/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { api } from "~/trpc/react";

import CreateRepairCommentForm from "./CreateRepairCommentForm";
import { RepairComment } from "./RepairComment";

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
          <RepairComment comment={comment} key={comment.id} />
        ))}
      </CardContent>
    </Card>
  );
}
