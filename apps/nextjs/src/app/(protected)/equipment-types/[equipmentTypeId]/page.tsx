import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import { api } from "~/trpc/server";

import EquipmentTypeAssetsTable from "../_components/EquipmentTypeAssetsTable";
import EquipmentTypeDetails from "../_components/EquipmentTypeDetails";
import EquipmentTypeModelsTable from "../_components/EquipmentTypeModelsTable";

interface ViewEquipmentTypePageProps {
  params: Promise<{
    equipmentTypeId: string;
  }>;
}

export default async function ViewEquipmentTypePage(
  props: ViewEquipmentTypePageProps,
) {
  const params = await props.params;
  const equipmentTypeId = Number(params.equipmentTypeId);
  const equipmentType = await api.equipmentTypes.getById({
    id: equipmentTypeId,
  });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{equipmentType.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            href={`/equipment-types/${equipmentTypeId}/edit`}
            variant="update"
          >
            Update
          </IconButton>
          <IconButton
            href={`/equipment-types/${equipmentTypeId}/archive`}
            variant="delete"
          >
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeDetails equipmentTypeId={equipmentTypeId} />
      <EquipmentTypeModelsTable equipmentTypeId={equipmentTypeId} />
      <EquipmentTypeAssetsTable equipmentTypeId={equipmentTypeId} />
    </PageWrapper>
  );
}
