import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateRepairSlug(repairId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveRepairModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
            repairId={repairId}
          />
          <IconButton to={`/repairs/${repairId}/edit`} variant="update">
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
