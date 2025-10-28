import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageDescription,
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import RepairsTable from "~/components/tables/RepairsTable";

export const Route = createFileRoute("/_protected/repairs/")({
  component: AllRepairsPage,
});

function AllRepairsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Repairs</PageTitle>
          <PageDescription>
            Manage and track all equipment repairs
          </PageDescription>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton linkOptions={{ to: "/repairs/new" }} variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <RepairsTable />
    </PageWrapper>
  );
}
