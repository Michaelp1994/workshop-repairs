import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdateRepairForm from "../../_components/UpdateRepairForm";

interface EditRepairPageProps {
  params: Promise<{
    repairId: string;
  }>;
}

export default async function EditRepairPage(props: EditRepairPageProps) {
  const params = await props.params;
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
