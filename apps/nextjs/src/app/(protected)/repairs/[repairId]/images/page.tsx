import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import RepairImageCarousel from "../../_components/RepairImageCarousel";

interface RepairImageGalleryPageProps {
  params: {
    repairId: RepairID;
  };
}

export default function RepairImageGalleryPage({
  params,
}: RepairImageGalleryPageProps) {
  const repairId = Number(params.repairId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
        <CardDescription>
          Photos associated with repair {repairId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RepairImageCarousel repairId={repairId} />
      </CardContent>
    </Card>
  );
}
