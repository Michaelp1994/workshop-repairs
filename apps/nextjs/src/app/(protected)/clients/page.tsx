import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import ClientsTable from "./_components/ClientsTable";

export const metadata: Metadata = {
  title: "Clients",
};

export default function AllClientsPage() {
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
