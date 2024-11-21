"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import { api } from "~/trpc/client";

import CreateRepairCommentForm from "../CreateRepairCommentForm";
import { RepairComment } from "./RepairComment";

interface RepairCommentsTableProps {
  repairId: RepairID;
}

export default function RepairCommentsTable({
  repairId,
}: RepairCommentsTableProps) {
  const [repairComments] = api.repairComments.getAllByRepairId.useSuspenseQuery(
    {
      repairId,
    },
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {repairComments.map((comment) => (
          <RepairComment comment={comment} key={comment.id} />
        ))}
      </CardContent>
      <CardFooter className="block border-t p-4">
        <CreateRepairCommentForm repairId={repairId} />
      </CardFooter>
    </Card>
  );
}
