import { type ModelID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ModelAssetsSection from "../_components/ModelAssetsSection";
import ModelDetailsSection from "../_components/ModelDetailsSection";
import ModelImagesSection from "../_components/ModelImagesSection";
import ModelPartsTable from "../_components/ModelPartsTable";

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
      <ModelDetailsSection modelId={modelId} />
      <ModelAssetsSection modelId={modelId} />
      <ModelPartsTable modelId={modelId} />
      <ModelImagesSection modelId={modelId} />
    </PageWrapper>
  );
}
