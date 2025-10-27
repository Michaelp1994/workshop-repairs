import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
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

export const Route = createFileRoute("/(protected)/_layout/parts/$partId/")({
  component: ViewPartPage,
});

function ViewPartPage() {
  const params = Route.useParams();
  const partId = Number(params.partId);
  const [part] = api.parts.getById.useSuspenseQuery({
    id: partId,
  });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{part.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/parts/${partId}/edit`} variant="update">
            Update
          </IconButton>
          <IconButton href={`/parts/${partId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <PartDetails partId={partId} />
      <PartModelsTable partId={partId} />
    </PageWrapper>
  );
}
