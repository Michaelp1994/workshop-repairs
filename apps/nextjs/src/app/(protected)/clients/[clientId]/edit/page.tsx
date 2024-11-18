import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateClientForm from "../../_components/UpdateClientForm";

interface EditClientPageProps {
  params: {
    clientId: string;
  };
}

export default function EditClientPage({ params }: EditClientPageProps) {
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