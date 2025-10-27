import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ModelsTable from "~/components/ModelsTable";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/models/")({
  component: AllModelsPage,
});

function AllModelsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Models</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/models/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ModelsTable />
    </PageWrapper>
  );
}
