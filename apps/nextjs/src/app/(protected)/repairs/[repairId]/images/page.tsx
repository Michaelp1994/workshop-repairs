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
  params: Promise<{
    repairId: RepairID;
  }>;
}

export default async function RepairImageGalleryPage(
  props: RepairImageGalleryPageProps,
) {
  const params = await props.params;
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
