"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Wrench } from "@repo/ui/icons";

import { api } from "~/trpc/client";

export default function OngoingRepairsCard() {
  const [totalRepairs] = api.repairs.getCount.useSuspenseQuery({
    columnFilters: [
      {
        id: "status",
        value: [1, 2, 3, 4, 5],
      },
    ],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Repairs</CardTitle>
        <Wrench />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalRepairs}</div>
        <p className="text-muted-foreground text-xs">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}
