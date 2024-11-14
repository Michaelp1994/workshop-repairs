import Breadcrumbs from "~/app/(protected)/_components/Breadcrumbs";
import { api } from "~/trpc/server";

interface ViewAssetBreadcrumbProps {
  params: {
    clientId: string;
  };
}

export default async function ViewClientBreadcrumb({
  params,
}: ViewAssetBreadcrumbProps) {
  const clientId = Number(params.clientId);
  const client = await api.clients.getById.query({ id: clientId });

  const routes = [
    { href: "/assets", label: "Clients" },
    { href: `/assets/${clientId}`, label: client.name },
  ];

  return <Breadcrumbs routes={routes} />;
}
