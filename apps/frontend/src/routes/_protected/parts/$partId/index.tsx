import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ArchivePartModal from "~/components/modals/ArchivePartModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import PartDetails from "~/components/PartDetails";
import PartModelsTable from "~/components/PartModelsTable";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/parts/$partId/")({
  component: ViewPartPage,
});

function ViewPartPage() {
  const { partId } = Route.useParams();
  const [part] = api.parts.getById.useSuspenseQuery({
    id: partId,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchivePartModal, { partId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{part.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{ to: "/parts/$partId/edit", params: { partId } }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <PartDetails partId={partId} />
      <PartModelsTable partId={part.id.toString()} />
    </PageWrapper>
  );
}
