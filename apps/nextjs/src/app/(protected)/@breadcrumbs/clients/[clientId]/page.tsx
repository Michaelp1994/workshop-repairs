import { Breadcrumbs } from "@repo/ui/breadcrumb";

import { api } from "~/trpc/server";

interface BreadcrumbSlotProps {
  params: {
    clientId: string;
  };
}

export default async function BreadcrumbSlot({ params }: BreadcrumbSlotProps) {
  const clientId = Number(params.clientId);
  const client = await api.clients.getById({ id: clientId });
  const routes = [
    {
      label: "Clients",
      href: "/clients",
    },
    {
      label: client.name,
      href: `/clients/${params.clientId}`,
    },
  ];
  return <Breadcrumbs routes={routes} />;
}
