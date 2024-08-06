import type { InitialDataTableState } from "@repo/ui/data-table";
import type { LocationID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import AssetsTable from "~/components/tables/AssetsTable";

interface LocationAssetsSectionProps {
  locationId: LocationID;
}

export default function LocationRepairsSection({
  locationId,
}: LocationAssetsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
    columnFilters: [{ id: "location_id", value: locationId }],
    columnVisibility: {
      image: false,
      serialNumber: true,
      status: true,
      location: true,
      assetNumber: false,
      createdAt: false,
      updatedAt: false,
      manufacturer: false,
      model: false,
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
