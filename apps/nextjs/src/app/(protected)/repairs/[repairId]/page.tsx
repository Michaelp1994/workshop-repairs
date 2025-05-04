import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import generateRepairSlug from "~/utils/generateRepairSlug";

import RepairComments from "../_components/RepairComments";
import RepairDetails from "../_components/RepairDetails";
import RepairImages from "../_components/RepairImages";
import RepairParts from "../_components/RepairParts";

interface ViewRepairPageProps {
  params: Promise<{
    repairId: string;
  }>;
}

export default async function ViewRepairPage(props: ViewRepairPageProps) {
  const params = await props.params;
  const repairId = Number(params.repairId);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateRepairSlug(repairId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/repairs/${repairId}/archive`} variant="delete">
            Archive
          </IconButton>
          <IconButton href={`/repairs/${repairId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairDetails repairId={repairId} />
      <RepairParts repairId={repairId} />
      <RepairComments repairId={repairId} />
      <RepairImages repairId={repairId} />
    </PageWrapper>
  );
}
