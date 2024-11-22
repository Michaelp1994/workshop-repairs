import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

import UpdatEquipmentTypeForm from "../../_components/UpdateEquipmentTypeForm";

interface EditEquipmentTypePageProps {
  params: {
    equipmentTypeId: string;
  };
}

export default function EditEquipmentTypePage({
  params,
}: EditEquipmentTypePageProps) {
  const equipmentTypeId = Number(params.equipmentTypeId);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit Equipment Type</PageTitle>
        </PageHeaderText>
      </PageHeader>
      <Card>
        <CardContent>
          <UpdatEquipmentTypeForm equipmentTypeId={equipmentTypeId} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
