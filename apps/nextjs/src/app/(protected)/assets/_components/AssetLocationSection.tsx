"use client";
import type { AssetID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import GoogleMap from "~/components/Map";
import { api } from "~/trpc/client";

interface AssetLocationSectionProps {
  assetId: AssetID;
}

export default function AssetLocationSection({
  assetId,
}: AssetLocationSectionProps) {
  const [asset] = api.assets.getById.useSuspenseQuery({
    id: assetId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleMap location={{ lat: 0, lng: 0 }} />
      </CardContent>
    </Card>
  );
}
