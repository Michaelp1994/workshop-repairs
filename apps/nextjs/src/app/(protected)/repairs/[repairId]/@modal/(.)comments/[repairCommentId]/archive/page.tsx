import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import ArchiveRepairCommentButton from "~/components/ArchiveRepairCommentButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveCommentModalProps {
  params: Promise<{
    repairId: string;
    repairCommentId: string;
  }>;
}

export default function ArchiveCommentModal(props: ArchiveCommentModalProps) {
  const params = use(props.params);
  const navigate = useNavigate();
  const repairCommentId = Number(params.repairCommentId);

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Repair Comment</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveRepairCommentButton repairCommentId={repairCommentId}>
              Yes, I am sure
            </ArchiveRepairCommentButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
