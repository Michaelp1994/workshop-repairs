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
import generateAssetSlug from "~/utils/generateAssetSlug";

export const Route = createFileRoute("/_protected/assets/$assetId/")({
  component: ViewAssetPage,
});

function ViewAssetPage() {
  const params = Route.useParams();
  const assetId = Number(params.assetId);
  function showArchiveModal() {
    NiceModal.show(ArchiveAssetModal, { assetId });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateAssetSlug(assetId)}</PageTitle>
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
      <AssetRepairsTable assetId={assetId} />
    </PageWrapper>
  );
}
