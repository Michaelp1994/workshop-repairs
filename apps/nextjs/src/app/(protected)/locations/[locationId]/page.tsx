import { type LocationID } from "@repo/validators/ids.validators";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

import LocationAssetsSection from "../_components/LocationAssetsSection";
import LocationDetailsSection from "../_components/LocationDetailsSection";

interface ViewLocationPageProps {
  params: {
    locationId: LocationID;
  };
}

export default function ViewLocationPage({ params }: ViewLocationPageProps) {
  const locationId = Number(params.locationId);
  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <LocationDetailsSection locationId={locationId} />
        <LocationAssetsSection locationId={locationId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn></DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
