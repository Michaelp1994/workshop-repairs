"use client";
import type { RouterOutputs } from "@repo/api/root";

import { Button } from "@repo/ui/button";
import { formatRelative } from "date-fns";
import { useState } from "react";

type Comment = RouterOutputs["repairComments"]["getAllByRepairId"][number];

interface RepairCommentProps {
  comment: Comment;
}

export function RepairComment({ comment }: RepairCommentProps) {
  const [truncate, setTruncate] = useState(true);
  const lines = (comment.comment.match(/\n/g) ?? "").length + 1;

  return (
    <div className="bg-muted mt-4 flex gap-4 rounded-lg p-4">
      <div className="flex h-12 items-center justify-center bg-yellow-600 font-bold">
        {comment.createdBy.firstName.slice(0, 1)}
        {comment.createdBy.lastName.slice(0, 1)}
      </div>
      <div>
        <div className="pb-2">
          <span className="text-xl font-bold">
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </span>
          <span className="text-muted-foreground pl-2 text-xs font-light">
            {formatRelative(comment.createdAt, new Date())}
          </span>
        </div>
        <p className="line-clamp-5 whitespace-pre-wrap">{comment.comment}</p>
        {lines > 4 && (
          <Button
            onClick={() => {
              setTruncate((prev) => !prev);
            }}
            size="sm"
            variant="link"
          >
            Read {truncate ? "more" : "less"}
          </Button>
        )}
      </div>
    </div>
  );
}
