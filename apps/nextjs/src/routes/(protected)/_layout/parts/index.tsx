import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import PartsTable from "~/components/PartsTable";

export const Route = createFileRoute("/(protected)/_layout/parts/")({
  component: AllPartsPage,
});

function AllPartsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Parts</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/parts/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <PartsTable />
    </PageWrapper>
  );
}
