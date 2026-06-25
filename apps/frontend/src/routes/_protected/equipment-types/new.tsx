import { Card, CardContent } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateEquipmentTypeForm from "~/components/forms/CreateEquipmentTypeForm";
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

export const Route = createFileRoute("/_protected/equipment-types/new")({
  component: CreateEquipmentTypePage,
});

function CreateEquipmentTypePage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>New Equipment Type</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <CreateEquipmentTypeForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
