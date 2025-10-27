import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import EquipmentTypeTable from "~/components/tables/EquipmentTypeTable";

export const Route = createFileRoute("/_protected/equipment-types/")({
  component: AllEquipmentTypesPage,
});

function AllEquipmentTypesPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Equipment Types</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton to="/equipment-types/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeTable />
    </PageWrapper>
  );
}
