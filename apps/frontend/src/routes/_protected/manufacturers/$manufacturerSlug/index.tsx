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
  "/_protected/manufacturers/$manufacturerSlug/",
)({
  component: ViewManufacturerPage,
});

function ViewManufacturerPage() {
  const { manufacturerSlug } = Route.useParams();
  const [manufacturer] = api.manufacturers.getBySlug.useSuspenseQuery({
    slug: manufacturerSlug,
  });
  async function showArchiveModal() {
    await NiceModal.show(ArchiveManufacturerModal, { slug: manufacturerSlug });
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
              to: "/manufacturers/$manufacturerSlug/edit",
              params: { manufacturerSlug },
            }}
            variant="update"
          >
            Update
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <ManufacturerDetails slug={manufacturerSlug} />
      <ManufacturerModelsTable manufacturerId={manufacturer.id} />
    </PageWrapper>
  );
}
