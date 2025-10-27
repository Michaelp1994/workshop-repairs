import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import AssetsTable from "~/components/tables/AssetsTable";

export const Route = createFileRoute("/_protected/assets/")({
  component: AllAssetsPage,
});

function AllAssetsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Assets</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/assets/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <AssetsTable />
    </PageWrapper>
  );
}
