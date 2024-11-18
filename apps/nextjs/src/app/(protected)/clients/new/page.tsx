import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import Breadcrumbs from "../../_components/Breadcrumbs";
import CreateClientForm from "../_components/CreateClientForm";

const breadcrumbs = [
  { label: "Clients", href: "/clients" },
  { label: "New Client", href: "/clients/new" },
];

export default function CreateClientPage() {
  return (
    <PageWrapper>
      <Breadcrumbs routes={breadcrumbs} />
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Client</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateClientForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
