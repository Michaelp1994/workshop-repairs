import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{equipmentType.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/equipment-types/$equipmentTypeId/edit",
              params: { equipmentTypeId },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveEquipmentTypeModal
            equipmentTypeId={equipmentTypeId}
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
          />
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeDetails equipmentTypeId={equipmentTypeId} />
      <EquipmentTypeModelsTable equipmentTypeId={equipmentTypeId} />
      <EquipmentTypeAssetsTable equipmentTypeId={equipmentTypeId} />
    </PageWrapper>
  );
}
