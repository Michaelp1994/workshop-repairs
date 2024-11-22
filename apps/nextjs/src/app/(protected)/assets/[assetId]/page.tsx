import type { Metadata } from "next";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import generateAssetSlug from "~/utils/generateAssetSlug";

import AssetDetails from "../_components/AssetDetails";
import AssetRepairsTable from "../_components/AssetRepairsTable";

interface ViewAssetPageProps {
  params: {
    assetId: string;
  };
}

export const metadata: Metadata = {
  title: "View Asset",
  description: "Create a new asset",
};

export default function ViewAssetPage({ params }: ViewAssetPageProps) {
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
