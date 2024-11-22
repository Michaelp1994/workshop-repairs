"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";

import RepairImageCarousel from "../../../_components/RepairImageCarousel";

interface RepairImagesModalProps {
  params: { repairId: RepairID };
}

export default function RepairImagesModal({ params }: RepairImagesModalProps) {
  const repairId = Number(params.repairId);
  const router = useRouter();
  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
      open
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gallery</DialogTitle>
            <DialogDescription>
              Images associated with repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <div className="p-10">
            <RepairImageCarousel repairId={repairId} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
