"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { PlusCircle } from "@repo/ui/icons";
import { useState } from "react";

import CreateRepairPartForm from "../CreateRepairPartForm";

interface CreateRepairPartModalProps {
  repairId: RepairID;
}

export default function CreateRepairPartModal({
  repairId,
}: CreateRepairPartModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={(state) => setIsOpen(state)} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 size-4" />
          Add Part
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Repair Part</DialogTitle>
        </DialogHeader>
        <CreateRepairPartForm
          onFinish={() => setIsOpen(false)}
          repairId={repairId}
        />
      </DialogContent>
    </Dialog>
  );
}
