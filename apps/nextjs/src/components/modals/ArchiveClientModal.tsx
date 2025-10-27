import type { ClientID } from "@repo/validators/ids.validators";

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

import ArchiveClientButton from "../ArchiveClientButton";

interface ArchiveClientModalProps extends BaseModalProps {
  clientId: ClientID;
}

export default function ArchiveClientModal({
  clientId,
  isOpen,
  onOpenChange,
}: ArchiveClientModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this client?
            </DialogDescription>
          </DialogHeader>
          This client will no longer be avaliable.
          <DialogFooter>
            <Button onClick={() => onOpenChange()}>No</Button>
            <ArchiveClientButton clientId={clientId}>
              Yes, I am sure
            </ArchiveClientButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
