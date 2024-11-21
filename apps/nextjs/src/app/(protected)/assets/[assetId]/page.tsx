import type { Metadata } from "next";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import generateAssetSlug from "~/utils/generateAssetSlug";

import AssetDetailsSection from "../_components/AssetDetailsSection";
import AssetRepairsSection from "../_components/AssetRepairsSection";

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
        </PageHeaderActions>
      </PageHeader>
      <AssetDetailsSection assetId={assetId} />
      <AssetRepairsSection assetId={assetId} />
    </PageWrapper>
  );
}
