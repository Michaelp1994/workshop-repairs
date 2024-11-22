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

import ArchiveRepairPartButton from "~/app/(protected)/repairs/_components/ArchiveRepairPartButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveRepairPartModalProps {
  params: {
    repairId: string;
    repairPartId: string;
  };
}

export default function ArchiveRepairPartModal({
  params,
}: ArchiveRepairPartModalProps) {
  const router = useRouter();

  const repairPartId = Number(params.repairPartId);

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Repair Part</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair part?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveRepairPartButton repairPartId={repairPartId}>
              Yes, I am sure
            </ArchiveRepairPartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
