import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import EquipmentTypeAssetsSection from "../_components/EquipmentTypeAssetsSection";
import EquipmentTypeDetailsSection from "../_components/EquipmentTypeDetailsSection";
import EquipmentTypeModelsTable from "../_components/EquipmentTypeModelsTable";

interface ViewEquipmentTypePageProps {
  params: {
    equipmentTypeId: string;
  };
}

export default async function ViewEquipmentTypePage({
  params,
}: ViewEquipmentTypePageProps) {
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
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeDetailsSection equipmentTypeId={equipmentTypeId} />
      {/* <EquipmentTypeModelsTable equipmentTypeId={equipmentTypeId} /> */}
      <EquipmentTypeAssetsSection equipmentTypeId={equipmentTypeId} />
    </PageWrapper>
  );
}
