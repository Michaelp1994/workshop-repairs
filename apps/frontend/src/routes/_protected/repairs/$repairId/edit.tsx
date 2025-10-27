import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateRepairForm from "~/components/forms/UpdateRepairForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
export const Route = createFileRoute(
  "/_protected/repairs/$repairId/edit",
)({
  component: EditRepairPage,
});

function EditRepairPage() {
  const params = Route.useParams();
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
