"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { Badge } from "@repo/ui/badge";

import { api } from "~/trpc/client";

interface RepairStatusBadgeProps {
  repairId: RepairID;
}

export default function RepairStatusBadge({
  repairId,
}: RepairStatusBadgeProps) {
  const { data: repair } = api.repairs.getById.useQuery({
    id: repairId,
  });
  return (
    <Badge className="ml-auto sm:ml-0" variant="default">
      {repair?.status.name}
    </Badge>
  );
}
