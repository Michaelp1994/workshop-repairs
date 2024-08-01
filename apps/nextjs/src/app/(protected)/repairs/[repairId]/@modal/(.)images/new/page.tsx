"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
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

interface ArchiveRepairModalProps {
  params: { repairId: RepairID };
}

export default function ArchiveRepairModal({
  params,
}: ArchiveRepairModalProps) {
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
            <DialogTitle>Archive Repair</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this item?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                router.back();
              }}
            >
              No
            </Button>
            <Button variant="destructive">Yes, I am sure</Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
