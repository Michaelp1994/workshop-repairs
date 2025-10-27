import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const params = Route.useParams();
  const modelId = Number(params.modelId);
  const [model] = api.models.getById.useSuspenseQuery({ id: modelId });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{model.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to={`/models/${modelId}/edit`} variant="update">
            Update
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveModelModal
            isOpen={isOpen}
            modelId={modelId}
            onOpenChange={() => setIsOpen(false)}
          />
        </PageHeaderActions>
      </PageHeader>
      <ModelDetails modelId={modelId} />
      <ModelAssetsTable modelId={modelId} />
      <ModelPartsTable modelId={modelId} />
      <ModelImages modelId={modelId} />
    </PageWrapper>
  );
}
