import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateRepairForm from "~/components/forms/UpdateRepairForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
export const Route = createFileRoute("/_protected/repairs/$repairSlug/edit")({
  component: EditRepairPage,
});

function EditRepairPage() {
  const { repairSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Repair</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateRepairForm slug={repairSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
