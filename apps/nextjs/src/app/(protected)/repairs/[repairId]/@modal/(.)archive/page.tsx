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

import { BackButton } from "~/components/BackButton";
import generateRepairSlug from "~/utils/generateRepairSlug";

import ArchiveRepairButton from "../../../../../../components/ArchiveRepairButton";

interface ArchiveRepairModalProps {
  params: Promise<{ repairId: string }>;
}

export default function ArchiveRepairModal(props: ArchiveRepairModalProps) {
  const params = use(props.params);
  const repairId = Number(params.repairId);
  const navigate = useNavigate();
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
