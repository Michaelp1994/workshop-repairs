import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ArchiveRepairModal from "~/components/modals/ArchiveRepairModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import RepairCommentsTable from "~/components/RepairComments";
import RepairDetails from "~/components/RepairDetails";
import RepairImages from "~/components/RepairImages";
import RepairParts from "~/components/RepairParts";
import generateRepairSlug from "~/utils/generateRepairSlug";

export const Route = createFileRoute("/_protected/repairs/$repairId/")({
  component: ViewRepairPage,
});

function ViewRepairPage() {
  const params = Route.useParams();
  const repairId = Number(params.repairId);
  function showArchiveModal() {
    NiceModal.show(ArchiveRepairModal, { repairId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateRepairSlug(repairId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <Button onClick={showArchiveModal}>Archive</Button>
          <IconButton
            linkOptions={{
              to: "/repairs/$repairId/edit",
              params: { repairId },
            }}
            variant="update"
          >
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairDetails repairId={repairId} />
      <RepairParts repairId={repairId} />
      <RepairCommentsTable repairId={repairId} />
      <RepairImages repairId={repairId} />
    </PageWrapper>
  );
}
