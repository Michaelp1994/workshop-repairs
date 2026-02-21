import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import ManufacturersTable from "~/components/tables/ManufacturersTable";

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
          <IconButton
            linkOptions={{ to: "/manufacturers/new" }}
            variant="create"
          >
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturersTable />
    </PageWrapper>
  );
}
