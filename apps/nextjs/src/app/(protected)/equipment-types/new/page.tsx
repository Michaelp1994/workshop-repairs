import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import CreateEquipmentTypeForm from "../_components/CreateEquipmentTypeForm";

export default function CreateEquipmentTypePage() {
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
