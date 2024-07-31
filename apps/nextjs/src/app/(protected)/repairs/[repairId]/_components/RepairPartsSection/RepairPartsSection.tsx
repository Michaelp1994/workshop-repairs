import { Button } from "@repo/ui/button";
import RepairPartsTable from "./RepairPartsTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { type RepairID } from "@repo/validators/ids.validators";
import Link from "next/link";
import { getBaseUrl } from "~/utils/getBaseUrl";
import { PlusCircle } from "@repo/ui/icons";

interface RepairPartsSectionProps {
  repairId: RepairID;
}

export default function RepairPartsSection({
  repairId,
}: RepairPartsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts Used</CardTitle>
      </CardHeader>
      <CardContent>
        <RepairPartsTable repairId={repairId} />
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button variant="ghost" asChild>
          <Link href={`${getBaseUrl()}/repairs/${repairId}/parts/new`}>
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Part
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
