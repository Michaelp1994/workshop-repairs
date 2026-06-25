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
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/repairs/$repairId/")({
  component: ViewRepairPage,
});

function ViewRepairPage() {
  const { repairId } = Route.useParams();
  const [repair] = api.repairs.getById.useSuspenseQuery({
    id: repairId,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveRepairModal, { repairId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{repairId}</PageTitle>
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
