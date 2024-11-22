import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdateRepairForm from "../../_components/UpdateRepairForm";

interface EditRepairPageProps {
  params: {
    repairId: string;
  };
}

export default function EditRepairPage({ params }: EditRepairPageProps) {
  const repairId = Number(params.repairId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Repair</PageTitle>
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
