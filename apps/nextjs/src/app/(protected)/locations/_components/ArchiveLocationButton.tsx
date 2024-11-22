"use client";
import type { LocationID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveLocationButtonProps {
  locationId: LocationID;
  children: ReactNode;
}

export default function ArchiveLocationButton({
  locationId,
  children,
}: ArchiveLocationButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.locations.archive.useMutation({
    async onSuccess(data) {
      await utils.locations.getAll.invalidate();
      await utils.locations.countAll.invalidate();
      await utils.locations.getById.invalidate({
        id: locationId,
      });
      toast.success(`${data.name} has been archived.`);
      router.replace("/locations");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: locationId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
