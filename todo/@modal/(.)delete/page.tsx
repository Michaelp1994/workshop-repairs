"use client";
import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { type RepairID } from "@repo/validators/ids.validators";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface DeleteRepairModalProps {
  params: {
    repairId: RepairID;
  };
}

export default function DeleteRepairModal({ params }: DeleteRepairModalProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = api.repairs.delete.useMutation();
  async function handleClick() {
    await mutateAsync({ id: params.repairId });
    router.back();
  }
  return (
    <Dialog open defaultOpen onOpenChange={() => router.back()}>
      <DialogPortal>
        <DialogClose />
        <DialogOverlay />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you wish to delete this item?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.back()} disabled={isPending}>
              No
            </Button>
            <Button
              onClick={handleClick}
              variant="destructive"
              disabled={isPending}
            >
              Yes, I am sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
