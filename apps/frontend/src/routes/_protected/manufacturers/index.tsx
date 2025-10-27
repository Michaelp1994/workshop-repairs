import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ManufacturersTable from "~/components/ManufacturersTable";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/manufacturers/")({
  component: AllManufacturersPage,
});

function AllManufacturersPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Manufacturers</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to="/manufacturers/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturersTable />
    </PageWrapper>
  );
}
