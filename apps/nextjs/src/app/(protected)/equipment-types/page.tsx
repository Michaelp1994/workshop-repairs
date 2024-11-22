import type { Metadata } from "next";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";

import EquipmentTypeTable from "./_components/EquipmentTypeTable";

export const metadata: Metadata = {
  title: "Equipment Types",
};

export default function AllEquipmentTypesPage() {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Equipment Types</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href="/equipment-types/new" variant="create">
            Create
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <EquipmentTypeTable />
    </PageWrapper>
  );
}
