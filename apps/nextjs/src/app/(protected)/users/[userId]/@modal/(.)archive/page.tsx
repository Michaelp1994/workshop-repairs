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
import { use } from "react";

import { BackButton } from "~/components/BackButton";

import ArchiveUserButton from "../../../_components/ArchiveUserButton";

interface ArchiveUserModalProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function ArchiveUserModal(props: ArchiveUserModalProps) {
  const params = use(props.params);
  const router = useRouter();
  const userId = Number(params.userId);

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
              Are you sure you wish to archive this user?
            </DialogDescription>
          </DialogHeader>
          This user will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveUserButton userId={userId}>
              Yes, I am sure
            </ArchiveUserButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
