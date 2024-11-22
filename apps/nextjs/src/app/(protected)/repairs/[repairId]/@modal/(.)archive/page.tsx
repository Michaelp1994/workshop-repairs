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

import { BackButton } from "~/components/BackButton";
import generateRepairSlug from "~/utils/generateRepairSlug";

import ArchiveRepairButton from "../../../_components/ArchiveRepairButton";

interface ArchiveRepairModalProps {
  params: { repairId: string };
}

export default function ArchiveRepairModal({
  params,
}: ArchiveRepairModalProps) {
  const repairId = Number(params.repairId);
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()} open>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive {generateRepairSlug(repairId)}</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this repair?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveRepairButton repairId={repairId}>
              Yes, I am sure
            </ArchiveRepairButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
