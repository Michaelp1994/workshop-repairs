import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdatePartForm from "../../_components/UpdatePartForm";

interface EditPartPageProps {
  params: {
    partId: PartID;
  };
}

export default function EditPartPage({ params }: EditPartPageProps) {
  const partId = Number(params.partId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Part</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdatePartForm partId={partId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
