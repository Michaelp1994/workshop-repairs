import type { RepairID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ArrowUpRight } from "@repo/ui/icons";
import Link from "next/link";

import { api } from "~/trpc/server";

interface AssetDetailsProps {
  repairId: RepairID;
}

export default async function AssetDetailsSection({
  repairId,
}: AssetDetailsProps) {
  const repair = await api.repairs.getById({
    id: repairId,
  });

  const { asset, model, manufacturer, location } = repair;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Asset Details</CardTitle>
        <Button asChild size="icon" variant="ghost">
          <Link href={`/assets/${asset.id}`}>
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">View Asset</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <img alt={model.name} src={model.imageUrl} />
        <dl className="grid grid-cols-[auto_1fr] items-start gap-4">
          <dt className="font-bold">Asset Number</dt>
          <dd>{asset.assetNumber}</dd>
          <dt className="font-bold">Serial Number</dt>
          <dd>{asset.serialNumber}</dd>
          <dt className="font-bold">Model</dt>
          <dd>{model.name}</dd>
          <dt className="font-bold">Manufacturer</dt>
          <dd>{manufacturer.name}</dd>
          <dt className="font-bold">Location</dt>
          <dd>{location.name}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}
