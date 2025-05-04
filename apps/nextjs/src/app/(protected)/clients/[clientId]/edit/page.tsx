import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateClientForm from "../../_components/UpdateClientForm";

interface EditClientPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function EditClientPage(props: EditClientPageProps) {
  const params = await props.params;
  const clientId = Number(params.clientId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Client</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateClientForm clientId={clientId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
