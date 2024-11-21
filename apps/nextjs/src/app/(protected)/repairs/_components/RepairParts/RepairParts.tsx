import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { PlusCircle } from "@repo/ui/icons";
import { type RepairID } from "@repo/validators/ids.validators";
import Link from "next/link";

import { getBaseUrl } from "~/utils/getBaseUrl";

import RepairPartsTable from "./RepairPartsTable";

interface RepairPartsProps {
  repairId: RepairID;
}

export default function RepairParts({ repairId }: RepairPartsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts</CardTitle>
      </CardHeader>
      <CardContent>
        <RepairPartsTable repairId={repairId} />
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button asChild variant="ghost">
          <Link href={`${getBaseUrl()}/repairs/${repairId}/parts/new`}>
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Part
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
