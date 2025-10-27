import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ManufacturerModelsTable from "~/components/ManufacturerModelsTable";
import ManufacturerDetails from "~/components/ManufacturersDetails";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/client";

export const Route = createFileRoute(
  "/_protected/manufacturers/$manufacturerId/",
)({
  component: ViewManufacturerPage,
});

function ViewManufacturerPage() {
  const params = Route.useParams();
  const manufacturerId = Number(params.manufacturerId);
  const [manufacturer] = api.manufacturers.getById.useSuspenseQuery({
    id: manufacturerId,
  });

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
