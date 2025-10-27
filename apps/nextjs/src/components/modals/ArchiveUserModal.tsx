import type { UserID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  type BaseModalProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";

import ArchiveUserButton from "../ArchiveUserButton";

interface ArchiveUserModalProps extends BaseModalProps {
  userId: UserID;
}

export default function ArchiveUserModal({
  userId,
  onOpenChange,
  isOpen,
}: ArchiveUserModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
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
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveUserButton userId={userId}>
              Yes, I am sure
            </ArchiveUserButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
