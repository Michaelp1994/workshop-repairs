import { Card, CardContent } from "@repo/ui/card";

import {
  PageHeader,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import UpdatEquipmentTypeForm from "../../_components/UpdateEquipmentTypeForm";

interface EditEquipmentTypePageProps {
  params: Promise<{
    equipmentTypeId: string;
  }>;
}

export default async function EditEquipmentTypePage(
  props: EditEquipmentTypePageProps,
) {
  const params = await props.params;
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
