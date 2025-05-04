import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";
import generateAssetSlug from "~/utils/generateAssetSlug";

interface BreadcrumbSlotProps {
  params: Promise<{
    assetId: string;
  }>;
}

export default async function BreadcrumbSlot(props: BreadcrumbSlotProps) {
  const params = await props.params;
  const assetId = Number(params.assetId);
  const asset = await api.assets.getById({ id: assetId });
  const routes = [
    {
      label: "Assets",
      href: "/assets",
    },
    {
      label: generateAssetSlug(asset.id),
      href: `/assets/${params.assetId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
