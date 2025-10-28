import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import { IconButton } from "~/components/IconButton";
import ManufacturerModelsTable from "~/components/ManufacturerModelsTable";
import ManufacturerDetails from "~/components/ManufacturersDetails";
import ArchiveManufacturerModal from "~/components/modals/ArchiveManufacturerModal";
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
  function showArchiveModal() {
    NiceModal.show(ArchiveManufacturerModal, { manufacturerId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{manufacturer.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/manufacturers/$manufacturerId/edit",
              params: { manufacturerId },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturerDetails manufacturerId={manufacturerId} />
      <ManufacturerModelsTable manufacturerId={manufacturerId} />
    </PageWrapper>
  );
}
