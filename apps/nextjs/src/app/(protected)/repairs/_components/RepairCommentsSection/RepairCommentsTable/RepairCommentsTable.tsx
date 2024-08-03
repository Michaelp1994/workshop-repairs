"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { api } from "~/trpc/react";

import { RepairComment } from "./RepairComment";

interface RepairCommentsTableProps {
  repairId: RepairID;
}

export default function RepairCommentsTable({
  repairId,
}: RepairCommentsTableProps) {
  const { data, isLoading, isError } =
    api.repairComments.getAllByRepairId.useQuery({
      repairId,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading comments</div>;
  }
  return (
    <>
      {data.map((comment) => (
        <RepairComment comment={comment} key={comment.id} repairId={repairId} />
      ))}
    </>
  );
}
