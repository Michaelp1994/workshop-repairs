import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateRepairForm from "../../_components/UpdateRepairForm";

interface EditPartPageProps {
  params: {
    repairId: string;
  };
}

export default function EditPartPage({ params }: EditPartPageProps) {
  const repairId = Number(params.repairId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Part</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateRepairForm repairId={repairId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
