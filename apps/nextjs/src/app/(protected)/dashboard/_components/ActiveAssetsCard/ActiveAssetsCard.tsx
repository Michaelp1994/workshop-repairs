import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Laptop } from "@repo/ui/icons";

import { api } from "~/trpc/server";

interface ActiveAssetsCardProps {}

export default async function ActiveAssetsCard({}: ActiveAssetsCardProps) {
  const totalAssets = await api.assets.getCount.query({});

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
