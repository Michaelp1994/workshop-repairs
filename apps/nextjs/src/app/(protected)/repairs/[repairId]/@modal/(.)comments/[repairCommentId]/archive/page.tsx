"use client";
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
import { useRouter } from "next/navigation";

import ArchiveRepairCommentButton from "~/app/(protected)/repairs/_components/ArchiveRepairCommentButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveCommentModalProps {
  params: {
    repairId: string;
    repairCommentId: string;
  };
}

export default function ArchiveCommentModal({
  params,
}: ArchiveCommentModalProps) {
  const router = useRouter();
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
