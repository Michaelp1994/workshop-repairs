"use client";
import type { RouterOutputs } from "@repo/api/router";

import { Avatar, AvatarFallback } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { Pencil, Trash2, User } from "@repo/ui/icons";
import { formatRelative } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "~/app/SessionProvider";

import { CommentText } from "./CommentText";

type Comment = RouterOutputs["repairComments"]["getAllByRepairId"][number];

interface RepairCommentProps {
  comment: Comment;
}

export function RepairComment({ comment }: RepairCommentProps) {
  const pathName = usePathname();
  const session = useSession();
  console.log({ session });
  console.log({ createdById: comment.createdById });

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
        {session.userId === comment.createdById && (
          <div>
            <Button asChild size="sm" variant="ghost">
              <Link href={`${pathName}/comments/${comment.id}`} scroll={false}>
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link
                href={`${pathName}/comments/${comment.id}/archive`}
                scroll={false}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Archive
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
