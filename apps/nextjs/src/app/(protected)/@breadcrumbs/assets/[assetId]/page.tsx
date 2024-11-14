import Breadcrumbs from "~/app/(protected)/_components/Breadcrumbs";
import { api } from "~/trpc/server";

interface ViewAssetBreadcrumbProps {
  params: {
    assetId: string;
  };
}

export default async function ViewAssetBreadcrumb({
  params,
}: ViewAssetBreadcrumbProps) {
  const assetId = Number(params.assetId);
  const asset = await api.assets.getById.query({ id: assetId });

  const routes = [
    { href: "/assets", label: "Assets" },
    { href: `/assets/${assetId}`, label: asset.serialNumber },
  ];

  return <Breadcrumbs routes={routes} />;
}
