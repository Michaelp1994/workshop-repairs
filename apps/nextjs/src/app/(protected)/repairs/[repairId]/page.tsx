import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import AssetDetailsSection from "../_components/AssetDetailsSection";
import RepairCommentsSection from "../_components/RepairCommentsSection";
import RepairImagesSection from "../_components/RepairImagesSection";
import RepairStatusDetails from "../_components/RepairStatusDetails";

interface ViewRepairPageProps {
  params: {
    repairId: string;
  };
}

export default async function ViewRepairPage({ params }: ViewRepairPageProps) {
  const repairId = Number(params.repairId);
  const repair = await api.repairs.getById({
    id: repairId,
  });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{repair.id}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/repairs/${repairId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      {/* <RepairPartsSection repairId={repairId} /> */}
      <RepairCommentsSection repairId={repairId} />
      <RepairStatusDetails repairId={repairId} />
      <AssetDetailsSection repairId={repairId} />
      <RepairImagesSection repairId={repairId} />
    </PageWrapper>
  );
}
