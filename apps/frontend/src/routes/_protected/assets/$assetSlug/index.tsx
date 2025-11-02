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

export const Route = createFileRoute("/_protected/assets/$assetSlug/")({
  component: ViewAssetPage,
});

function ViewAssetPage() {
  const { assetSlug } = Route.useParams();

  const [asset] = api.assets.getBySlug.useSuspenseQuery({ slug: assetSlug });

  async function showArchiveModal() {
    await NiceModal.show(ArchiveAssetModal, { assetId: asset.id });
  }
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{assetSlug}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton
            linkOptions={{
              to: "/assets/$assetSlug/edit",
              params: { assetSlug },
            }}
            variant="update"
          >
            Edit
          </IconButton>
          <Button onClick={showArchiveModal}>Archive</Button>
        </PageHeaderActions>
      </PageHeader>
      <AssetDetails slug={assetSlug} />
      <AssetRepairsTable assetId={asset.id} />
    </PageWrapper>
  );
}
