import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

export const Route = createFileRoute("/(protected)/_layout/assets/$assetId/")({
  component: ViewAssetPage,
});

function ViewAssetPage() {
  const params = Route.useParams();
  const assetId = Number(params.assetId);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateAssetSlug(assetId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/assets/${assetId}/edit`} variant="update">
            Edit
          </IconButton>
          <Button onClick={() => setIsOpen(true)}>Archive</Button>
          <ArchiveAssetModal
            assetId={assetId}
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(false)}
          />
        </PageHeaderActions>
      </PageHeader>
      <AssetDetails assetId={assetId} />
      <AssetRepairsTable assetId={assetId} />
    </PageWrapper>
  );
}
