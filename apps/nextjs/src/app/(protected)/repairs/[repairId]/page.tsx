import ArchiveSection from "~/app/_components/ArchiveSection";
import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/app/_components/DetailsPage";
import { getBaseUrl } from "~/utils/getBaseUrl";

import AssetDetailsSection from "./_components/AssetDetailsSection";
import RepairCommentsSection from "./_components/RepairCommentsSection";
import RepairDetailsSection from "./_components/RepairDetailsSection";
import RepairImagesSection from "./_components/RepairImagesSection";
import RepairPartsSection from "./_components/RepairPartsSection";
import RepairStatusDetails from "./_components/RepairStatusDetails";

interface ViewRepairPageProps {
  params: {
    repairId: string;
  };
}

export default function ViewRepairPage({ params }: ViewRepairPageProps) {
  const repairId = Number(params.repairId);

  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <RepairDetailsSection repairId={repairId} />
        <RepairPartsSection repairId={repairId} />
        <RepairCommentsSection repairId={repairId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn>
        <RepairStatusDetails repairId={repairId} />
        <AssetDetailsSection repairId={repairId} />
        <RepairImagesSection repairId={repairId} />
        <ArchiveSection
          description="This will archive the repair and prevent any future updates."
          href={`${getBaseUrl()}/repairs/${repairId}/archive`}
          title="Archive Repair"
        />
      </DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
