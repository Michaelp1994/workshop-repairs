import { createFileRoute } from "@tanstack/react-router";

import EquipmentTypeAssetsTable from "~/components/EquipmentTypeAssetsTable";
import EquipmentTypeDetails from "~/components/EquipmentTypeDetails";
import EquipmentTypeModelsTable from "~/components/EquipmentTypeModelsTable";
import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute(
  "/_protected/equipment-types/$equipmentTypeId/",
)({
  component: ViewEquipmentTypePage,
});

function ViewEquipmentTypePage() {
  const params = Route.useParams();
  const equipmentTypeId = Number(params.equipmentTypeId);
  const [equipmentType] = api.equipmentTypes.getById.useSuspenseQuery({
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
