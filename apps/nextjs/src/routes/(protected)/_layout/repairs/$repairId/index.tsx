import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import generateRepairSlug from "~/utils/generateRepairSlug";

import RepairComments from "../../../../../components/RepairComments";
import RepairDetails from "../../../../../components/RepairDetails";
import RepairImages from "../../../../../components/RepairImages";
import RepairParts from "../../../../../components/RepairParts";

export const Route = createFileRoute("/(protected)/_layout/repairs/$repairId/")(
  {
    component: ViewRepairPage,
  },
);

function ViewRepairPage() {
  const params = Route.useParams();
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
