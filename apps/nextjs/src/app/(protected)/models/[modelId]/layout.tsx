import { BackButton } from "~/app/_components/BackButton";
import {
  DetailsPage,
  DetailsPageToolbar,
  DetailsPageTitle,
} from "~/app/_components/DetailsPage";
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
