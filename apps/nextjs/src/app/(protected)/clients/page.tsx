import type { Metadata } from "next";

import { CreateLink } from "~/components/ButtonLink";
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
          <CreateLink href="/clients/new">Create</CreateLink>
        </PageHeaderActions>
      </PageHeader>
      <ClientsTable />
    </PageWrapper>
  );
}
