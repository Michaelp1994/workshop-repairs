"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { api } from "~/trpc/client";

import { RepairComment } from "./RepairComment";

interface RepairCommentsTableProps {
  repairId: RepairID;
}

export default function RepairCommentsTable({
  repairId,
}: RepairCommentsTableProps) {
  const [data] = api.repairComments.getAllByRepairId.useSuspenseQuery({
    repairId,
  });

  return (
    <>
      {data.map((comment) => (
        <RepairComment comment={comment} key={comment.id} repairId={repairId} />
      ))}
    </>
  );
}
