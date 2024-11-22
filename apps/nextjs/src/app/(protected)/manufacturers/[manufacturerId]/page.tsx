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

import ManufacturerModelsTable from "../_components/ManufacturerModelsTable";
import ManufacturerDetails from "../_components/ManufacturersDetails";

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
          <IconButton href={`${manufacturerId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturerDetails manufacturerId={manufacturerId} />
      <ManufacturerModelsTable manufacturerId={manufacturerId} />
    </PageWrapper>
  );
}
