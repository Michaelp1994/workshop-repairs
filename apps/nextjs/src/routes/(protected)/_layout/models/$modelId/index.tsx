import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
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

export const Route = createFileRoute("/(protected)/_layout/models/$modelId/")({
  component: ViewModelPage,
});

function ViewModelPage() {
  const params = Route.useParams();
  const modelId = Number(params.modelId);
  const [model] = api.models.getById.useSuspenseQuery({ id: modelId });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{model.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${modelId}/edit`} variant="update">
            Update
          </IconButton>
          <IconButton href={`${modelId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ModelDetails modelId={modelId} />
      <ModelAssetsTable modelId={modelId} />
      <ModelPartsTable modelId={modelId} />
      <ModelImages modelId={modelId} />
    </PageWrapper>
  );
}
