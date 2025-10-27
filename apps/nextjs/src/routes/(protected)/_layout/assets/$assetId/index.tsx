import { createFileRoute } from "@tanstack/react-router";

import AssetDetails from "~/components/AssetDetails";
import { IconButton } from "~/components/IconButton";
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
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{generateAssetSlug(assetId)}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${assetId}/edit`} variant="update">
            Edit
          </IconButton>
          <IconButton href={`${assetId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <AssetDetails assetId={assetId} />
      <AssetRepairsTable assetId={assetId} />
    </PageWrapper>
  );
}
