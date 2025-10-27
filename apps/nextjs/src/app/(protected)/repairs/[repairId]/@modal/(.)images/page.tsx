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
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import RepairImageCarousel from "../../../../../../components/RepairImages/RepairImageCarousel";

interface RepairImagesModalProps {
  params: Promise<{ repairId: RepairID }>;
}

export default function RepairImagesModal(props: RepairImagesModalProps) {
  const params = use(props.params);
  const repairId = Number(params.repairId);
  const navigate = useNavigate();
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
