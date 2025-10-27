import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import ClientsTable from "~/components/tables/ClientsTable";

export const Route = createFileRoute("/(protected)/_layout/clients/")({
  component: AllClientsPage,
});

function AllClientsPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Clients</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/clients/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ClientsTable />
    </PageWrapper>
  );
}
