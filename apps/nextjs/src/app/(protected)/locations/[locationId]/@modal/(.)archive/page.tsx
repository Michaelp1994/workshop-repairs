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

import ArchiveLocationButton from "../../../_components/ArchiveLocationButton";

interface ArchiveLocationModalProps {
  params: {
    locationId: string;
  };
}

export default function ArchiveLocationModal({
  params,
}: ArchiveLocationModalProps) {
  const router = useRouter();
  const locationId = Number(params.locationId);

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
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this location?
            </DialogDescription>
          </DialogHeader>
          This location will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveLocationButton locationId={locationId}>
              Yes, I am sure
            </ArchiveLocationButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
