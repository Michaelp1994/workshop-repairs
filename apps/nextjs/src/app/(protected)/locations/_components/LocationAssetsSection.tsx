import type { LocationID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import AssetsTable from "~/app/(protected)/assets/_components/AssetsTable";

interface LocationAssetsSectionProps {
  locationId: LocationID;
}

export default function LocationRepairsSection({
  locationId,
}: LocationAssetsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable />
      </CardContent>
    </Card>
  );
}
