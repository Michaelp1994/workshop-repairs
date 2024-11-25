import type { RepairID } from "@repo/validators/ids.validators";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import RepairImageCarousel from "../../_components/RepairImages/RepairImageCarousel";

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
        <CardHeaderText>
          <CardTitle>Gallery</CardTitle>
          <CardDescription>
            Photos associated with repair {repairId}
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <RepairImageCarousel repairId={repairId} />
      </CardContent>
    </Card>
  );
}
