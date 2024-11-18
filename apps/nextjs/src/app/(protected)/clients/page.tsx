import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import ClientsTable from "../../../components/tables/ClientsTable";
import Breadcrumbs from "../_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Clients",
};

const breadcrumbs = [{ label: "Clients", href: "/clients" }];

export default function AllClientsPage() {
  return (
    <PageWrapper>
      <Breadcrumbs routes={breadcrumbs} />
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Clients</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton variant="create" href="/clients/new">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ClientsTable />
    </PageWrapper>
  );
}
