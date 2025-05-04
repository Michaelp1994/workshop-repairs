import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdatePartForm from "../../_components/UpdatePartForm";

interface EditPartPageProps {
  params: Promise<{
    partId: PartID;
  }>;
}

export default async function EditPartPage(props: EditPartPageProps) {
  const params = await props.params;
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
