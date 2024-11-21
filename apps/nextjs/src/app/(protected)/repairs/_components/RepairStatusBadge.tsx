"use client";
import type { RepairStatusTypeID } from "@repo/validators/ids.validators";

import { Badge } from "@repo/ui/badge";

interface RepairStatusBadgeProps {
  status: {
    id: RepairStatusTypeID;
    name: string;
    colour: string;
  };
}

export default function RepairStatusBadge({ status }: RepairStatusBadgeProps) {
  return (
    <Badge className="ml-auto sm:ml-0" variant="outline">
      <div
        className="mr-2 size-3 rounded-full"
        style={{ backgroundColor: status.colour }}
      />
      {status.name}
    </Badge>
  );
}
