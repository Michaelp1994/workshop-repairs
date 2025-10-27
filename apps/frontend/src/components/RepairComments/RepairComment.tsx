import { Avatar, AvatarFallback } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { Pencil, Trash2, User } from "@repo/ui/icons";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { formatRelative } from "date-fns";

import { useSession } from "~/auth/SessionProvider";

import type { RouterOutputs } from "../../../../backend/src/router";

import { CommentText } from "./CommentText";

type Comment = RouterOutputs["repairComments"]["getAllByRepairId"][number];

interface RepairCommentProps {
  comment: Comment;
}

export function RepairComment({ comment }: RepairCommentProps) {
  const location = useLocation();
  const session = useSession();

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
              <Link to={`${location.pathname}/comments/${comment.id}`}>
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to={`${location.pathName}/comments/${comment.id}/archive`}>
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
