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

export const Route = createFileRoute("/_protected/models/$modelSlug/")({
  component: ViewModelPage,
});

function ViewModelPage() {
  const { modelSlug } = Route.useParams();
  const [model] = api.models.getBySlug.useSuspenseQuery({ slug: modelSlug });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveModelModal, { slug: modelSlug });
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
              to: "/models/$modelSlug/edit",
              params: { modelSlug },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <ModelDetails slug={modelSlug} />
      <ModelAssetsTable modelId={model.id} />
      <ModelPartsTable modelId={model.id} />
      <ModelImages modelId={model.id} />
    </PageWrapper>
  );
}
