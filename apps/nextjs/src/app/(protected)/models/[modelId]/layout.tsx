import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";
import { api } from "~/utils/api";

interface AssetLayoutProps {
  params: {
    modelId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function AssetLayout({
  children,
  modal,
  params,
}: AssetLayoutProps) {
  const modelId = Number(params.modelId);
  const model = await api.models.getById.query({ id: modelId });
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>{model.name}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
      {modal}
    </DetailsPage>
  );
}
