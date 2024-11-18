import type { ManufacturerID } from "@repo/validators/ids.validators";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";
import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ManufacturerDetailsSection from "../_components/ManufacturerDetailsSection";
import ManufacturerModelsSection from "../_components/ManufacturerModelsSection";

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
      <ManufacturerModelsSection manufacturerId={manufacturerId} />
    </PageWrapper>
  );
}
