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

export const Route = createFileRoute("/_protected/repairs/$repairSlug/")({
  component: ViewRepairPage,
});

function ViewRepairPage() {
  const { repairSlug } = Route.useParams();
  const [repair] = api.repairs.getBySlug.useSuspenseQuery({
    slug: repairSlug,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveRepairModal, { slug: repairSlug });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{repairSlug}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <Button onClick={showArchiveModal}>Archive</Button>
          <IconButton
            linkOptions={{
              to: "/repairs/$repairSlug/edit",
              params: { repairSlug },
            }}
            variant="update"
          >
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairDetails slug={repairSlug} />
      <RepairParts repairId={repair.id} />
      <RepairCommentsTable repairId={repair.id} />
      <RepairImages repairId={repair.id} />
    </PageWrapper>
  );
}
