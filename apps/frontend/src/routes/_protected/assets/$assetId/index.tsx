import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";

import AssetDetails from "~/components/AssetDetails";
import { IconButton } from "~/components/IconButton";
import ArchiveAssetModal from "~/components/modals/ArchiveAssetModal";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import AssetRepairsTable from "~/components/tables/AssetRepairsTable";
import { api } from "~/trpc/client";

export const Route = createFileRoute("/_protected/assets/$assetId/")({
  component: ViewAssetPage,
});

function ViewAssetPage() {
  const { assetId } = Route.useParams();

  const [asset] = api.assets.getById.useSuspenseQuery({ id: assetId });

  async function showArchiveModal() {
    await NiceModal.show(ArchiveAssetModal, { assetId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{assetId}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/assets/$assetId/edit",
              params: { assetId },
            }}
            variant="update"
          >
            Edit
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <AssetDetails assetId={assetId} />
      <AssetRepairsTable assetId={asset.id.toString()} />
    </PageWrapper>
  );
}
