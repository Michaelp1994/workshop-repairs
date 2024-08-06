import type { ManufacturerID } from "@repo/validators/ids.validators";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

import ManufacturerDetailsSection from "../_components/ManufacturerDetailsSection";
import ManufacturerModelsSection from "../_components/ManufacturerModelsSection";

interface ViewManufacturerPageProps {
  params: {
    manufacturerId: ManufacturerID;
  };
}

export default function ViewManufacturerPage({
  params,
}: ViewManufacturerPageProps) {
  const manufacturerId = Number(params.manufacturerId);

  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <ManufacturerDetailsSection manufacturerId={manufacturerId} />
        <ManufacturerModelsSection manufacturerId={manufacturerId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn></DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
