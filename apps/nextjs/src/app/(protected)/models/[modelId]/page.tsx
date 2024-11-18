import { type ModelID } from "@repo/validators/ids.validators";

import ArchiveSection from "~/components/ArchiveSection";
import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";
import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";
import { getBaseUrl } from "~/utils/getBaseUrl";

import ModelAssetsSection from "../_components/ModelAssetsSection";
import ModelDetailsSection from "../_components/ModelDetailsSection";
import ModelImagesSection from "../_components/ModelImagesSection";
import ModelPartsSection from "../_components/ModelPartsSection";

interface ViewModelPageProps {
  params: {
    modelId: ModelID;
  };
}

export default async function ViewModelPage({ params }: ViewModelPageProps) {
  const modelId = Number(params.modelId);
  const model = await api.models.getById({ id: modelId });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{model.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${modelId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>

      <ModelAssetsSection modelId={modelId} />
      <ModelPartsSection modelId={modelId} />
      <ModelImagesSection modelId={modelId} />
    </PageWrapper>
  );
}
