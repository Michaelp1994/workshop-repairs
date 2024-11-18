import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { PlusCircle } from "@repo/ui/icons";
import Link from "next/link";

import RepairsTable from "~/app/(protected)/repairs/_components/RepairsTable";

interface AssetRepairsSectionProps {
  assetId: number;
}

export default function AssetRepairsSection({
  assetId,
}: AssetRepairsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Repairs</CardTitle>
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
        <RepairsTable />
      </CardContent>
    </Card>
  );
}
