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
  params: Promise<{
    assetId: string;
  }>;
}

export const metadata: Metadata = {
  title: "View Asset",
  description: "Create a new asset",
};

export default async function ViewAssetPage(props: ViewAssetPageProps) {
  const params = await props.params;
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
