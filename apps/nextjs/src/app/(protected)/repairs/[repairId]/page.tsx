import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import generateRepairSlug from "~/utils/generateRepairSlug";

import RepairCommentsSection from "../_components/RepairCommentsSection";
import RepairDetailsSection from "../_components/RepairDetailsSection";
import RepairImagesSection from "../_components/RepairImagesSection";

interface ViewRepairPageProps {
  params: {
    repairId: string;
  };
}

export default async function ViewRepairPage({ params }: ViewRepairPageProps) {
  const repairId = Number(params.repairId);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateRepairSlug(repairId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/repairs/${repairId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairDetailsSection repairId={repairId} />
      {/* <RepairPartsSection repairId={repairId} /> */}
      <RepairCommentsSection repairId={repairId} />
      <RepairImagesSection repairId={repairId} />
    </PageWrapper>
  );
}
