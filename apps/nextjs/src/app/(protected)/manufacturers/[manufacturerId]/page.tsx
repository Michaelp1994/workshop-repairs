import type { ManufacturerID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ManufacturerModelsSection from "../_components/ManufacturerModelsSection";
import ManufacturerDetailsSection from "../_components/ManufacturersDetailsSection";

interface ViewManufacturerPageProps {
  params: {
    manufacturerId: ManufacturerID;
  };
}

export default async function ViewManufacturerPage({
  params,
}: ViewManufacturerPageProps) {
  const manufacturerId = Number(params.manufacturerId);
  const manufacturer = await api.manufacturers.getById({ id: manufacturerId });

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{manufacturer.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${manufacturerId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturerDetailsSection manufacturerId={manufacturerId} />
      <ManufacturerModelsSection manufacturerId={manufacturerId} />
    </PageWrapper>
  );
}
