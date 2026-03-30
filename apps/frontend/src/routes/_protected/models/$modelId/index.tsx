import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ArchiveModelModal from "~/components/modals/ArchiveModelModal";
import ModelAssetsTable from "~/components/ModelAssetsTable";
import ModelDetails from "~/components/ModelDetails";
import ModelImages from "~/components/ModelImages";
import ModelPartsTable from "~/components/ModelPartsTable";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/models/$modelId/")({
  component: ViewModelPage,
});

function ViewModelPage() {
  const { modelId } = Route.useParams();
  const [model] = api.models.getById.useSuspenseQuery({ id: modelId });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveModelModal, { modelId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{model.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/models/$modelId/edit",
              params: { modelId },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <ModelDetails modelId={modelId} />
      <ModelAssetsTable modelId={model.id.toString()} />
      <ModelPartsTable modelId={model.id.toString()} />
      <ModelImages modelId={model.id.toString()} />
    </PageWrapper>
  );
}
