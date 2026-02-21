import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import UpdateEquipmentTypeForm from "~/components/forms/UpdateEquipmentTypeForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute(
  "/_protected/equipment-types/$equipmentTypeSlug/edit",
)({
  component: EditEquipmentTypePage,
});

function EditEquipmentTypePage() {
  const { equipmentTypeSlug } = Route.useParams();

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Equipment Type</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdateEquipmentTypeForm slug={equipmentTypeSlug} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
