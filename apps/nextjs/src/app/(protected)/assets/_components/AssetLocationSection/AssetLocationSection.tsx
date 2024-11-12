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
  const { data, isLoading, isError } = api.assets.getById.useQuery({
    id: assetId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }
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
