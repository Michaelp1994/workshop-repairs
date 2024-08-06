import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";

import RepairsTable from "~/components/tables/RepairsTable";

interface AssetRepairsSectionProps {
  assetId: number;
}

export default function AssetRepairsSection({
  assetId,
}: AssetRepairsSectionProps) {
  const initialState: InitialDataTableState = {
    columnFilters: [{ id: "asset_id", value: [assetId] }],
    columnVisibility: {
      image: false,
      asset_assetNumber: false,
      asset_serialNumber: false,
      createdAt: true,
      updatedAt: false,
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repairs</CardTitle>
        <CardDescription>All recorded repairs for this asset.</CardDescription>
      </CardHeader>
      <CardContent>
        <RepairsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
