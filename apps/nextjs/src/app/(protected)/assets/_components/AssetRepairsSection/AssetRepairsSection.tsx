import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { type InitialDataTableState } from "@repo/ui/data-table";
import { PlusCircle } from "@repo/ui/icons";
import Link from "next/link";

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
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Repairs</CardTitle>
          <CardDescription>
            All recorded repairs for this asset.
          </CardDescription>
        </div>
        <div>
          <Button asChild size="sm" variant="ghost">
            <Link href={`/repairs/new?assetId=${assetId}`}>
              <PlusCircle className="mr-1 h-4 w-4" />
              Add Repair
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RepairsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
