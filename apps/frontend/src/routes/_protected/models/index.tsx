import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import ModelsTable from "~/components/tables/ModelsTable";

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
          <IconButton linkOptions={{ to: "/models/new" }} variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ModelsTable />
    </PageWrapper>
  );
}
