import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import EquipmentTypeAssetsTable from "~/components/EquipmentTypeAssetsTable";
import EquipmentTypeDetails from "~/components/EquipmentTypeDetails";
import EquipmentTypeModelsTable from "~/components/EquipmentTypeModelsTable";
import { IconButton } from "~/components/IconButton";
import ArchiveEquipmentTypeModal from "~/components/modals/ArchiveEquipmentTypeModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute(
  "/_protected/equipment-types/$equipmentTypeSlug/",
)({
  component: ViewEquipmentTypePage,
});

function ViewEquipmentTypePage() {
  const { equipmentTypeSlug } = Route.useParams();

  const [equipmentType] = api.equipmentTypes.getBySlug.useSuspenseQuery({
    slug: equipmentTypeSlug,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveEquipmentTypeModal, {
      slug: equipmentTypeSlug,
    });
  }

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{equipmentType.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/equipment-types/$equipmentTypeSlug/edit",
              params: { equipmentTypeSlug },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeDetails equipmentTypeSlug={equipmentTypeSlug} />
      <EquipmentTypeModelsTable equipmentTypeId={equipmentType.id} />
      <EquipmentTypeAssetsTable equipmentTypeId={equipmentType.id} />
    </PageWrapper>
  );
}
