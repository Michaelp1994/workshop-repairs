"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Laptop } from "@repo/ui/icons";

import { api } from "~/trpc/client";

export default function ActiveAssetsCard() {
  const [totalAssets] = api.assets.countAll.useSuspenseQuery({});
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
        <Laptop />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalAssets}</div>
        <p className="text-muted-foreground text-xs">+40.1% from last month</p>
      </CardContent>
    </Card>
  );
}
