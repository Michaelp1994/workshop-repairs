"use client";
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
import { toast } from "@repo/ui/sonner";
import type { RepairID } from "@repo/validators/ids.validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ArchiveRepairModalProps {
  params: { repairId: RepairID };
}

export default function ArchiveRepairModal({
  params,
}: ArchiveRepairModalProps) {
  const repairId = Number(params.repairId);
  const router = useRouter();
  const archiveMutation = api.repairs.delete.useMutation({});
  const repairUrl = `${getBaseUrl()}/repairs/${repairId}`;
  async function archiveRepair() {
    await archiveMutation.mutateAsync({ id: repairId });
    toast.success("Repair has been archived.");
    router.back();
  }
  return (
    <Dialog open defaultOpen onOpenChange={() => router.back()}>
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
            <Button onClick={() => router.back()}>No</Button>
            <Button variant="destructive" onClick={archiveRepair}>
              Yes, I am sure
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
