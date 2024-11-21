"use client";
import type { RouterOutputs } from "@repo/api/router";

import { Avatar, AvatarFallback } from "@repo/ui/avatar";
import { User } from "@repo/ui/icons";
import { formatRelative } from "date-fns";

import { CommentText } from "./CommentText";

type Comment = RouterOutputs["repairComments"]["getAllByRepairId"][number];

interface RepairCommentProps {
  comment: Comment;
}

export function RepairComment({ comment }: RepairCommentProps) {
  return (
    <div className="mt-4 flex gap-4 rounded-lg p-4">
      <Avatar className="h-10 w-10 border">
        <AvatarFallback className="bg-white text-black">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </span>
          <span className="text-muted-foreground text-xs">
            {formatRelative(comment.createdAt, new Date())}
            {comment.updatedById && " (edited)"}
          </span>
        </div>
        <div>
          <CommentText>{comment.comment}</CommentText>
        </div>
      </div>
    </div>
  );
}
