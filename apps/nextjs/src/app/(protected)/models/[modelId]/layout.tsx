import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";
import { api } from "~/trpc/server";

interface AssetLayoutProps {
  params: {
    modelId: string;
  };
  children: React.ReactNode;
}

export default async function AssetLayout({
  children,
  params,
}: AssetLayoutProps) {
  const modelId = Number(params.modelId);
  const model = await api.models.getById({ id: modelId });
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>{model.name}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
