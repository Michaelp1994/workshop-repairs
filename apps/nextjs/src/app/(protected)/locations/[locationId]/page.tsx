import { type LocationID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import { api } from "~/trpc/server";

import LocationAssetsTable from "../_components/LocationAssetsTable";
import LocationDetails from "../_components/LocationDetails";

interface ViewLocationPageProps {
  params: {
    locationId: LocationID;
  };
}

export default async function ViewLocationPage({
  params,
}: ViewLocationPageProps) {
  const locationId = Number(params.locationId);
  const location = await api.locations.getById({ id: locationId });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{location.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${locationId}/edit`} variant="update">
            Edit
          </IconButton>
          <IconButton href={`${locationId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <LocationDetails locationId={locationId} />
      <LocationAssetsTable locationId={locationId} />
    </PageWrapper>
  );
}
